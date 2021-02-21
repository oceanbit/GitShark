#import "GitModule.h"

#import <React/RCTEventDispatcher.h>
#import <React/RCTUtils.h>

#import <ObjectiveGit/ObjectiveGit.h>

@implementation GitModule

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
    return @[@"CloneProgress"];
}

- (void)reject:(RCTPromiseRejectBlock)reject withError:(NSError *)error {
    NSString *codeWithDomain = [NSString stringWithFormat:@"E%@%zd", error.domain.uppercaseString, error.code];
    reject(codeWithDomain, error.localizedDescription, error);
}

RCT_EXPORT_METHOD(clone:
    (NSString *) uri
            path:
            (NSString *) path
            resolver:
            (RCTPromiseResolveBlock) resolve
            rejecter:
            (RCTPromiseRejectBlock) reject)
{
    void (^transferProgressBlock)(const git_transfer_progress *, BOOL *);
    void (^checkoutProgressBlock)(NSString *, NSUInteger, NSUInteger);

    transferProgressBlock = ^(const git_transfer_progress *progress, BOOL *stop) {
        // TODO: Make this function properly, please :(
        //    [self sendEventWithName:@"CloneProgress" body:@{
        //      @"phase": @"Transfer",
        //      @"total": @(progress),
        //      @"loaded": @(totalSteps)
        //    }];
    };
    checkoutProgressBlock = ^(NSString *path, NSUInteger completedSteps, NSUInteger totalSteps) {
        [self sendEventWithName:@"CloneProgress" body:@{
                // `path` can be `nil`, which will cause RN to crash
                @"phase": path ?: @"",
                @"total": @(completedSteps),
                @"loaded": @(totalSteps)
        }];
    };

    NSError *error = nil;
    GTCheckoutOptions *checkoutOptions = [GTCheckoutOptions checkoutOptionsWithStrategy:GTCheckoutStrategySafe];
    checkoutOptions.progressBlock = checkoutProgressBlock;

    NSDictionary *cloneOptions = @{
            GTRepositoryCloneOptionsCloneLocal: @YES,
            GTRepositoryCloneOptionsCheckoutOptions: checkoutOptions,
    };

    [GTRepository cloneFromURL:[NSURL URLWithString:uri] toWorkingDirectory:[NSURL URLWithString:path] options:cloneOptions error:&error transferProgressBlock:transferProgressBlock];

    if (error) {
        return [self reject:reject withError:error];
    }

    resolve(nil);
}


RCT_EXPORT_METHOD(addToStaged:
    (NSString *) path
            changes:
            (NSArray<NSString *> *) changes
            resolver:
            (RCTPromiseResolveBlock) resolve
            rejecter:
            (RCTPromiseRejectBlock) reject)
{

    NSError *error = nil;
    NSURL *pathUrl = [NSURL URLWithString:path];
    GTRepository *repo = [GTRepository repositoryWithURL:pathUrl error:&error];

    if (error) {
        return [self reject:reject withError:error];
    }

    GTIndex *index = [repo indexWithError:&error];

    NSFileManager *fileManager = [NSFileManager defaultManager];

    for (int i = 0; i < [changes count]; i = i + 1) {
        NSString *relPath = [changes objectAtIndex:i];

        NSString *absolutePath = [pathUrl.path stringByAppendingPathComponent:relPath];

        if ([fileManager fileExistsAtPath:absolutePath]) {
            [index addFile:relPath error:&error];
        } else {
            [index removeFile:relPath error:&error];
        }

        if (error) {
            return [self reject:reject withError:error];
        }
    }

    resolve(nil);
}

RCT_EXPORT_METHOD(removeFromStaged:
    (NSString *) path
            changes:
            (NSArray<NSString *> *) changes
            resolver:
            (RCTPromiseResolveBlock) resolve
            rejecter:
            (RCTPromiseRejectBlock) reject)
{

    NSError *error = nil;
    NSURL *pathUrl = [NSURL URLWithString:path];
    GTRepository *repo = [GTRepository repositoryWithURL:pathUrl error:&error];

    if (error) {
        return [self reject:reject withError:error];
    }

    GTBranch *head = [repo currentBranchWithError:&error];

    if (error) {
        return [self reject:reject withError:error];
    }

    GTCommit *headCommit = [head targetCommitWithError:&error];
    
    if (error) {
        return [self reject:reject withError:error];
    }

    [repo resetPathspecs:changes toCommit:headCommit error:&error];

    if (error) {
        return [self reject:reject withError:error];
    }

    resolve(nil);
}

@end
