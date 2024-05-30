import React, { useState, useEffect} from 'react';
import { Text, View, Image, Pressable, ScrollView, StyleSheet, TextInput, Dimensions, Button, FlatList } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_900Black } from '@expo-google-fonts/roboto';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons} from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import "core-js/stable/atob";
import { jwtDecode, JwtPayload } from 'jwt-decode';

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
  const [selectedTurnOns, setSelectedTurnOns] = useState([]);
  const [lookingOptions, setLookingOptions] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState([]);
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
      description: "Pop Rock-Indie pick our sound track",
    },
    {
      id: "10",
      name: "Kissing",
      description:
        " It's a feeling of closeness, where every touch of lips creates a symphony of emotions.",
    },
    {
      id: "1",
      name: "Fantasies",
      description:
        "Fantasies can be deeply personal, encompassing diverse elements such as romance",
    },
    {
      id: "2",
      name: "Nibbling",
      description:
        "playful form of biting or taking small, gentle bites, typically done with the teeth",
    },
    {
      id: "3",
      name: "Desire",
      description: "powerful emotion or attainment of a particular person.",
    },
  ];
  const data = [
    {
      id: "0",
      name: "Casual",
      description: "Let's keep it easy and see where it goes",
    },
    {
      id: "1",
      name: "Long Term",
      description: "How about a one life stand",
    },
    {
      id: "2",
      name: "Virtual",
      description: "Let's have some virtual fun",
    },
    {
      id: "3",
      name: "Open for Anything",
      description: "Let's Vibe and see where it goes",
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

      console.log(response.data); // Log the response for confirmation

      // Handle success or update your app state accordingly
      if (response.status === 200) {
        setLookingOptions(lookingOptions.filter((item) => item !== lookingFor));
      }
    } catch (error) {
      console.error("Error removing looking for:", error);
      // Handle error scenarios
    }
  };
  const handleAddImage = async () =>{
    try{
      const response = await axios.post(`http://192.168.0.33:3000/users/${userId}/profile-images`,{
          imageUrl:imageUrl
      });

      console.log(response);

      setImageUrl("");
    } catch(error){
        console.log("error",error)
    }
};

// Images dizisi güncellendiğinde rastgele bir resim seç
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
}, [images]); // images dizisi değiştiğinde bu useEffect tetiklenir

const [randomImage, setRandomImage] = useState(null); 


  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <Image
          style={{ width: "100%", height: 200, resizeMode: "cover" }}
          source={{
            uri: randomImage,
          }}
        />
        <View style={{ alignItems: 'center', marginTop: -30 }}>
          <Pressable
            style={{
              padding: 10,
              backgroundColor: "#FAF0E6",
              width: 300,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              zIndex: 1,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
              marginTop: -50,
            }}
          >
            <Image
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                resizeMode: "cover",
              }}
              source={{
                  uri: randomImage,
              }}
            />
            <Text style={{ fontSize: 16, fontFamily:"Roboto_900Black", marginTop: 6 }}>
              Bangalore
            </Text>
            <Text style={{ marginTop: 4, fontSize: 15, fontFamily:"Roboto_400Regular" }}>
              22 years 110 days
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={{
          marginHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          gap: 25,
          justifyContent: "center",
        }}>
        <Pressable onPress={() => setOption("AD")}>
          <Text style={{
              fontSize: 16,
              fontFamily:"Roboto_400Regular",
              color: option == "AD" ? "black" : "gray",
            }}>AD</Text>
        </Pressable>
        <Pressable onPress={() => setOption("Photos")}>
          <Text style={{
              fontSize: 16,
              fontFamily:"Roboto_400Regular",
              color: option == "Photos" ? "black" : "gray",
            }}>Photos</Text>
        </Pressable>
        <Pressable onPress={() => setOption("Turn-ons")}>
          <Text style={{
              fontSize: 16,
              fontFamily:"Roboto_400Regular",
              color: option == "Turn-ons" ? "black" : "gray",
            }}>Turn-ons</Text>
        </Pressable>
        <Pressable onPress={() => setOption("Looking For")}>
          <Text style={{
              fontSize: 16,
              fontFamily:"Roboto_400Regular",
              color: option == "Looking For" ? "black" : "gray",
            }}>Looking For</Text>
        </Pressable>
      </View>

      <View style={{ marginHorizontal: 14, marginVertical: 15 }}>
        {option == "AD" && (
          <View style={{
            borderColor: "#202020",
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            height: 300,
          }}>
            <TextInput 
              value={description}
              multiline
              onChangeText={(text) => setDescription(text)}
              style={{
                fontFamily: "Roboto_400Regular",
                fontSize: description ? 17 : 17,
              }} placeholder="Write your AD for people to like you"
            />
            <Pressable 
            onPress={updateUserDescription}
              style={{
                marginTop: "auto",
                flexDirection: "row",
                alignItems: "center",
                gap: 15,
                backgroundColor: "black",
                borderRadius: 5,
                justifyContent: "center",
                padding: 10,
              }}>
              <Text  
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: "500",
                }}>Publish in feed</Text>
              <Entypo name="mask" size={24} color="white" />
            </Pressable>
          </View>
        )}
      </View>

      <View style={{ marginHorizontal: 14 }}>
  {option == "Photos" && (
    <View>
      <ScrollView horizontal={true}>
        {images.map((item, index) => (  // 'profileImages' yerine 'images' kullanılıyor
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: item }} style={styles.image} />
          </View>
        ))}
      </ScrollView>
      <View style={{marginTop:25}}>
        <Text style={{fontFamily:"Roboto_400Regular"}}>
          Add a picture of yourself
        </Text>
        <View 
          style={{
            flexDirection:"row",
            alignItems:"center",
            gap:5,
            paddingVertical:5,
            borderRadius:5,
            marginTop:10,
            backgroundColor:"#DCDCDC",
          }}
        >
          <Entypo style={{marginLeft:8}} name="image" size={24} color="gray" />
          <TextInput
            value={imageUrl} 
            onChangeText={(text) => setImageUrl(text)}
            style={{color:"gray",marginVertical:10,width:300}}
            placeholder='enter your Image URL'
          ></TextInput>
        </View>
        <Button onPress={handleAddImage} style={{marginTop:5}} title='Add Image'/>
      </View>
    </View>
  )}
</View>


      <View style={{marginHorizontal:14, flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
        {option == "Turn-ons" && (
          <View>
            {turnons?.map((item,index) => (
              <Pressable
              onPress={() => handleToggleTurnOn(item?.name)} 
              style={{backgroundColor:"#FFFDD0",padding:7, marginVertical:10}} key={index}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <Text style={{textAlign:"center",fontFamily:"Roboto_700Bold", flex:1}}>{item?.name}</Text>
                  {selectedTurnOns.includes(item?.name) && (
                    <AntDesign name="checkcircle" size={18} color="#17B169" />
                  )}
                </View>
                <Text style={{marginTop:4, fontFamily:"Roboto_400Regular", color:"gray",textAlign:"center"}}>{item?.description}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      <View style={{marginHorizontal: 14}}>
  {option == "Looking For" && (
    <FlatList
      columnWrapperStyle={{ justifyContent: "space-between" }}
      numColumns={2}
      data={data}
      scrollEnabled={false} // FlatList'in kendi kaydırma işlevini devre dışı bırak
      renderItem={({ item }) => (
        <Pressable
          onPress={() => handleOption(item?.name)}
          style={{
            backgroundColor: lookingOptions.includes(item?.name) ? "#fd5c63" : "white",
            padding: 16,
            justifyContent: "center",
            alignItems: "center",
            width: 150,
            margin: 10,
            borderRadius: 5,
            borderColor: "#fd5c63",
            borderWidth: lookingOptions.includes(item?.name) ? 0 : 0.7,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Roboto_700Bold",
              color: lookingOptions.includes(item?.name) ? "white" : "black",
            }}
          >
            {item?.name}
          </Text>
          <Text
            style={{
              color: lookingOptions.includes(item?.name) ? "white" : "gray",
              textAlign: "center",
              width: 140,
              marginTop: 10,
              fontFamily: "Roboto_700Bold",
            }}
          >
            {item?.description}
          </Text>
        </Pressable>
      )}
    />
  )}
</View>



    </ScrollView>
  )
}

export default index;

const styles = StyleSheet.create({
  imageContainer: {
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#f0f0f0', // arka plan rengi, resim sığmadığında görünmesi için
  },
  image: {
    width: width - 60,
    height: 300,
    resizeMode: 'contain', // 'cover' yerine 'contain' kullanarak resimlerin tam olarak sığmasını sağlarız
  },
});

