import React, { useState, useEffect } from 'react';
import { Text, View, Image, Pressable, ScrollView, StyleSheet, TextInput, Dimensions, FlatList, Alert } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_900Black } from '@expo-google-fonts/roboto';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import "core-js/stable/atob";
import { jwtDecode, JwtPayload } from 'jwt-decode';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

const index = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_900Black,
  });

  const [option, setOption] = useState("AD");
  const [description, setDescription] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [selectedTurnOns, setSelectedTurnOns] = useState([]);
  const [lookingOptions, setLookingOptions] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState([]);
  const [randomImage, setRandomImage] = useState(null); 

  const profileImages = [
    {
      image:
        "https://picsum.photos/id/64/300/300",
    },
    {
      image:
        "https://picsum.photos/id/65/300/300",
    },
    {
      image:
        "https://picsum.photos/id/334/300/300",
    },
  ];

  const turnons = [
    {
      id: "0",
      name: "Music",
      description: "Enjoy various genres like Pop, Rock, and Indie.",
    },
    {
      id: "1",
      name: "Travel",
      description: "Exploring new places and experiencing different cultures.",
    },
    {
      id: "2",
      name: "Reading",
      description: "Diving into a good book and expanding knowledge.",
    },
    {
      id: "3",
      name: "Cooking",
      description: "Experimenting with recipes and creating delicious meals.",
    },
    {
      id: "4",
      name: "Fitness",
      description: "Staying active and maintaining a healthy lifestyle.",
    },
  ];
  
  const data = [
    {
      id: "0",
      name: "Friendship",
      description: "Building meaningful and lasting friendships.",
    },
    {
      id: "1",
      name: "Networking",
      description: "Connecting with professionals for career growth.",
    },
    {
      id: "2",
      name: "Mentorship",
      description: "Seeking guidance and knowledge sharing.",
    },
    {
      id: "3",
      name: "Learning",
      description: "Engaging in continuous learning and self-improvement.",
    },
  ];
  
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('auth');
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          setUserId(userId);
        }
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const fetchUserDescription = async () => {
    try {
      const response = await axios.get(`http://192.168.0.33:3000/users/${userId}`);
      console.log(response);
      const user = response.data;
    
      setDescription(user?.user?.description);
      setSelectedTurnOns(user.user?.turnOns);
      setImages(user?.user.profileImages);
      setLookingOptions(user?.user.lookingFor);
      userName = setUserName(user?.user?.name);

    } catch (error) {
      console.log("Error fetching user description", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserDescription();
    }
  }, [userId]);

  const updateUserDescription = async () => {
    try {
      const response = await axios.put(
        `http://192.168.0.33:3000/users/${userId}/description`,
        {
          description: description,
        }
      );

      console.log(response.data);

      if (response.status === 200) {
        Alert.alert("Success", "Description updated successfully");
      }
    } catch (error) {
      console.log("Error updating the user Description");
    }
  };

  const handleToggleTurnOn = (turnOn) => {
    if (selectedTurnOns.includes(turnOn)) {
      removeTurnOn(turnOn);
    } else {
      addTurnOn(turnOn);
    }
  };

  const addTurnOn = async (turnOn) => {
    try {
      const response = await axios.put(
        `http://192.168.0.33:3000/users/${userId}/turn-ons/add`,
        {
          turnOn: turnOn,
        }
      );

      console.log(response.data);

      if (response.status == 200) {
        setSelectedTurnOns([...selectedTurnOns, turnOn]);
      }
    } catch (error) {
      console.log("Error adding turn on", error);
    }
  };

  const removeTurnOn = async (turnOn) => {
    try {
      const response = await axios.put(
        `http://192.168.0.33:3000/users/${userId}/turn-ons/remove`,
        {
          turnOn: turnOn,
        }
      );

      console.log(response.data);

      if (response.status == 200) {
        setSelectedTurnOns(selectedTurnOns.filter((item) => item !== turnOn));
      }
    } catch (error) {
      console.log("error removing turn on", error);
    }
  };

  const handleOption = (lookingFor) => {
    if (lookingOptions.includes(lookingFor)) {
      removeLookingFor(lookingFor);
    } else {
      addLookingFor(lookingFor);
    }
  };

  const addLookingFor = async (lookingFor) => {
    try {
      const response = await axios.put(
        `http://192.168.0.33:3000/users/${userId}/looking-for`,
        {
          lookingFor: lookingFor,
        }
      );

      console.log(response.data);

      if (response.status == 200) {
        setLookingOptions([...lookingOptions, lookingFor]);
      }
    } catch (error) {
      console.log("Error addding looking for", error);
    }
  };

  const removeLookingFor = async (lookingFor) => {
    try {
      const response = await axios.put(
        `http://192.168.0.33:3000/users/${userId}/looking-for/remove`,
        {
          lookingFor: lookingFor,
        }
      );

      console.log(response.data);

      if (response.status === 200) {
        setLookingOptions(lookingOptions.filter((item) => item !== lookingFor));
      }
    } catch (error) {
      console.error("Error removing looking for:", error);
    }
  };

  const handleAddImage = async () => {
    try {
      const response = await axios.post(`http://192.168.0.33:3000/users/${userId}/profile-images`, {
        imageUrl: imageUrl
      });

      console.log(response);

      setImageUrl("");
    } catch (error) {
      console.log("error", error)
    }
  };

  useEffect(() => {
    const getRandomImage = () => {
      if (images.length > 0) {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
      }
      return null;
    };

    const newRandomImage = getRandomImage();
    if (newRandomImage) {
      setRandomImage(newRandomImage);
    }
  }, [images]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={styles.scrollView}>
      <Animatable.View animation="fadeInUp" style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri: randomImage,
          }}
        />
        <Text style={styles.profileName}>{userName}</Text>
        <Text style={styles.profileAge}>22 years 110 days</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={300} style={styles.optionsContainer}>
        <Pressable onPress={() => setOption("AD")}>
          <Text style={[styles.optionText, option === "AD" && styles.selectedOptionText]}>Info</Text>
        </Pressable>
        <Pressable onPress={() => setOption("Photos")}>
          <Text style={[styles.optionText, option === "Photos" && styles.selectedOptionText]}>Photos</Text>
        </Pressable>
        <Pressable onPress={() => setOption("Turn-ons")}>
          <Text style={[styles.optionText, option === "Turn-ons" && styles.selectedOptionText]}>Interests</Text>
        </Pressable>
        <Pressable onPress={() => setOption("Looking For")}>
          <Text style={[styles.optionText, option === "Looking For" && styles.selectedOptionText]}>Goals</Text>
        </Pressable>
      </Animatable.View>

      <View style={styles.contentContainer}>
        {option === "AD" && (
          <Animatable.View animation="fadeInUp" delay={300} style={styles.adContainer}>
            <TextInput
              value={description}
              multiline
              onChangeText={(text) => setDescription(text)}
              style={styles.adInput}
              placeholder="Provide your personal information to help others understand you better."
            />
            <Pressable onPress={updateUserDescription} style={styles.publishButton}>
              <Text style={styles.publishButtonText}>Publish in feed</Text>
            </Pressable>
          </Animatable.View>
        )}

        {option === "Photos" && (
          <Animatable.View animation="fadeInUp" delay={300}>
            <ScrollView horizontal={true}>
              {images.map((item, index) => (
                <View key={index} style={styles.imageContainer}>
                  <Image source={{ uri: item }} style={styles.image} />
                </View>
              ))}
            </ScrollView>
            <View style={styles.addImageContainer}>
              <Text style={styles.addImageText}>Add a picture of yourself</Text>
              <View style={styles.addImageInputContainer}>
                <Entypo style={styles.addImageIcon} name="image" size={24} color="gray" />
                <TextInput
                  value={imageUrl}
                  onChangeText={(text) => setImageUrl(text)}
                  style={styles.addImageInput}
                  placeholder="Enter your Image URL"
                />
              </View>
              <Pressable onPress={handleAddImage} style={styles.addImageButton}>
                <Text style={styles.addImageButtonText}>Add Image</Text>
              </Pressable>
            </View>
          </Animatable.View>
        )}

        {option === "Turn-ons" && (
          <Animatable.View animation="fadeInUp" delay={300}>
            {turnons.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => handleToggleTurnOn(item.name)}
                style={[styles.turnOnContainer, selectedTurnOns.includes(item.name) && styles.selectedTurnOnContainer]}
              >
                <Text style={styles.turnOnName}>{item.name}</Text>
                {selectedTurnOns.includes(item.name) && (
                  <AntDesign name="checkcircle" size={18} color="#17B169" />
                )}
                <Text style={styles.turnOnDescription}>{item.description}</Text>
              </Pressable>
            ))}
          </Animatable.View>
        )}

        {option === "Looking For" && (
          <Animatable.View animation="fadeInUp" delay={300}>
            <FlatList
              columnWrapperStyle={styles.flatListColumnWrapper}
              numColumns={2}
              data={data}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => handleOption(item.name)}
                  style={[
                    styles.lookingForContainer,
                    lookingOptions.includes(item.name) && styles.selectedLookingForContainer,
                  ]}
                >
                  <Text
                    style={[
                      styles.lookingForName,
                      lookingOptions.includes(item.name) && styles.selectedLookingForName,
                    ]}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={[
                      styles.lookingForDescription,
                      lookingOptions.includes(item.name) && styles.selectedLookingForDescription,
                    ]}
                  >
                    {item.description}
                  </Text>
                </Pressable>
              )}
            />
          </Animatable.View>
        )}
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#f5f5f5',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Roboto_900Black',
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Roboto_900Black',
    marginTop: 10,
  },
  profileAge: {
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
    color: '#666',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
    color: 'gray',
  },
  selectedOptionText: {
    color: 'black',
    fontWeight: 'bold',
  },
  contentContainer: {
    marginHorizontal: 20,
  },
  adContainer: {
    borderColor: '#202020',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  adInput: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 17,
    height: 100,
    textAlignVertical: 'top',
  },
  publishButton: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 10,
  },
  publishButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    marginRight: 10,
  },
  imageContainer: {
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: width - 60,
    height: 300,
    resizeMode: 'contain',
  },
  addImageContainer: {
    marginTop: 25,
  },
  addImageText: {
    fontFamily: 'Roboto_400Regular',
  },
  addImageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: '#DCDCDC',
  },
  addImageIcon: {
    marginLeft: 8,
  },
  addImageInput: {
    color: 'gray',
    marginVertical: 10,
    width: 300,
  },
  addImageButton: {
    marginTop: 10,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addImageButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Roboto_700Bold',
  },
  turnOnContainer: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#dcdcdc',
  },
  selectedTurnOnContainer: {
    backgroundColor: '#e0e0e0',
  },
  turnOnName: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 16,
    color: 'black',
  },
  turnOnDescription: {
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
    color: 'gray',
    textAlign: 'center',
  },
  flatListColumnWrapper: {
    justifyContent: 'space-between',
  },
  lookingForContainer: {
    backgroundColor: 'white',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    margin: 10,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 0.7,
  },
  selectedLookingForContainer: {
    backgroundColor: 'black',
  },
  lookingForName: {
    textAlign: 'center',
    fontFamily: 'Roboto_700Bold',
    color: 'black',
  },
  selectedLookingForName: {
    color: 'white',
  },
  lookingForDescription: {
    textAlign: 'center',
    width: 140,
    marginTop: 10,
    fontFamily: 'Roboto_700Bold',
    color: 'gray',
  },
  selectedLookingForDescription: {
    color: 'white',
  },
});

