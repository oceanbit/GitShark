/**
 * @format
 */
import 'reflect-metadata';
import {createConnection, getConnectionManager, getRepository} from 'typeorm';
import {Repo} from './entities';

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {Header, Colors} from 'react-native/Libraries/NewAppScreen';
import {CloneRepo} from './components/clone-repo/clone-repo';
import {PermissionsAndroid} from 'react-native';
import {FSDemos} from './components/fs-demos/fs-demos';

const App = () => {
  const [stateString, setStateString] = React.useState('Loading...');
  const [repos, setRepos] = React.useState<Repo[]>([]);

  React.useEffect(() => {
    const askedPermission = PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]);
    askedPermission.then(granted => {
      if (
        granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('You can use external storage');
      } else {
        console.log('External storage permission denied');
      }
    });
  }, []);

  const findRepos = async () => {
    try {
      const repoRepository = getRepository(Repo);
      const repos = await repoRepository.find({});
      setRepos(repos);
      return true; // Indicates this works
    } catch (e) {
      setStateString('There was an error finding the repos!');
    }
  };

  React.useEffect(() => {
    // TODO: Add error handling
    createConnection({
      type: 'react-native',
      database: 'test',
      location: 'default',
      logging: ['error', 'query', 'schema'],
      synchronize: true,
      entities: [Repo],
    })
      .then(() => {
        setStateString('Successfully Loaded Database');
        findRepos();
      })
      .catch(err => {
        if (err.name === 'AlreadyHasActiveConnectionError') {
          const existentConn = getConnectionManager().get('default');
          setStateString('Successfully Loaded Database');
          findRepos();
          return existentConn;
        }
        setStateString('There was an error loading the DB!');
        console.error(err);
      });
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>State: {stateString}</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Clone Demo:</Text>
              <CloneRepo
                onClone={() => findRepos()}
                onError={e => {
                  console.error(e);
                  setStateString('Error cloning repo');
                }}
              />
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>FS Demos:</Text>
              <FSDemos />
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Repos:</Text>
              {repos.map(repo => (
                <Text key={repo.id} style={styles.item}>
                  {repo.name}
                </Text>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    borderColor: Colors.black,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default App;
