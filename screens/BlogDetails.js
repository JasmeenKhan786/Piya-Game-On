import React from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import db from '../config'
import { Ionicons } from '@expo/vector-icons';


export default class VlogDetails extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      image: '',
      title: '',
      description: '',
      author:'',
      selectedid: props.route.params.id,
    };
  }
   
  getData = async () => {
    var responce = await db
      .collection('Blogs') 
      .doc(this.state.selectedid)
      .get();

    this.setState({
      title: responce.data().Title, 
      description: responce.data().Description,
      author: responce.data().authorName,

    });
  };
  componentDidMount() {
    this.getData();
  } 
  render() {
    return (
      <View style={{ flex: 1 ,backgroundColor:'white'}}>
        <ScrollView contentContainerStyle={{flex:1}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '15%',
              marginLeft: '5%',
            }}>
            <TouchableOpacity style={{}} onPress={() => {
              this.props.navigation.goBack()
            }}>
              <Ionicons
                name="caret-back-circle-sharp"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>
              Blogs
            </Text>
          </View>

          <Image
            source={{
              uri: 'data:image/jpeg;base64,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',
            }}
            style={{
              marginTop: 30,
              width: '90%',
              height: 200,
              borderBottomRightRadius: 20,
              borderTopRightRadius: 20,
            }} 
          />

          <Text
            style={{
              fontWeight: 'bold',
              marginHorizontal: '5%',
              fontSize: 22, 
              marginTop: 10,
            }}>
            {this.state.title}
          </Text>

          <Text
            style={{ color: 'grey', marginHorizontal: '5%', marginTop: 10, fontSize:15 }}>
           {this.state.author}
          </Text>
 
          <View
            style={{
              backgroundColor: '#E9CCA7',
              marginTop: 20,
              width: '80%',
              borderTopLeftRadius: 20,
              padding: 15, 
              alignSelf: 'flex-end',
              flex:1,
            }}>
            <Text style={{
              color:'#301719' ,
              fontSize:16
            }}> 
              {this.state.description}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}