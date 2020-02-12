/**
 * @format
 */
import 'reflect-metadata';
import {createConnection, getRepository} from 'typeorm';
import {Repo} from './entities';

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  FlatList,
} from 'react-native';

import {Header, Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const [stateString, setStateString] = React.useState('Loading...');
  const [repos, setRepos] = React.useState<Repo[]>([]);

  const findRepos = async () => {
    try {
      const repoRepository = getRepository(Repo);
      const repos = await repoRepository.find({});
      setRepos(repos);
      return true; // Indicates this works
    } catch (e) {
      setStateString('There was an error creating the new repo!');
    }
  };

  const createNewRepo = async () => {
    try {
      const newRepo = new Repo();
      newRepo.name = 'Hello, World!';
      await newRepo.save();
      return true; // Indicates this works
    } catch (e) {
      setStateString('There was an error creating the new repo!');
    }
  };

  const createAndFindAll = async () => {
    const isDone = await createNewRepo();
    if (!isDone) return;
    await findRepos();
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
        setStateString('Successfully Loaded');
      })
      .catch(() => setStateString('There was an error!'));
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
              <Text style={styles.sectionTitle}>Repos {stateString}:</Text>
              <Button
                title="Create A New Repo"
                onPress={() => createAndFindAll()}
              />
              <FlatList
                data={repos}
                renderItem={({item}) => (
                  <Text style={styles.item}>{item.name}</Text>
                )}
              />
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
