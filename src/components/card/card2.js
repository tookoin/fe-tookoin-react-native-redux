import React, {useState, Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import styles from './card.style';
import {Icon} from 'react-native-elements';

//redux
import {connect} from 'react-redux';
import {postToCartAction} from '../../redux/actions/cart/cartAction';
import {SAPI_URL} from 'react-native-dotenv';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

class Card extends Component {
  constructor() {
    super();
    this.state = {Quantity: 0, localArray: []};
  }
  render() {
    const {
      container,
      name,
      image,
      price,
      priceText,
      unit,
      beli,
      kuantity,
    } = styles;

    const goToDetail = () => {
      this.props.navigation.push('DetailProdukBuyer', {
        id_product: this.props.id_product,
        id_category: this.props.id_category,
        id_seller: this.props.id_seller,
        name: this.props.name,
        label: this.props.label,
        unit: this.props.unit,
        price: this.props.price,
        quantity: this.state.Quantity,
        name_category: this.props.name_category,
      });
    };

    const postToCart = async statusQuantity => {
      console.log('you are crazy');
      let id_productPost = this.props.id_product;
      let id_sellerPost = this.props.id_seller;
      let quantityPost = 1;
      if (statusQuantity == 1) {
        quantityPost = 1;
      } else {
        quantityPost = -1;
      }

      // console.log('your id productx = ', id_productPost)
      // console.log('your id sellerx = ', id_sellerPost)
      // console.log('your quantityx = ', quantityPost)
      let data = {
        id_product: id_productPost,
        id_seller: id_sellerPost,
        qty: quantityPost,
      };
      let url = SAPI_URL + '/cart';

      let token = await AsyncStorage.getItem('token');
      let config = {
        headers: {Authorization: 'Bearer ' + token},
      };

      console.log('your URLxxxxx =', url);
      console.log('your configxxx = ', config);
      console.log('your dataxxxx = ', data);
      console.log('status ququququq =', quantityPost);

      // let kuantitas = this.state.Quantity;
      // console.log('kuantitias kamu', kuantitas);
      
      await axios.post(url, data, config);
      // if (kuantitas > 0) {
      //   axios.post(url, data, config);
      // } else {
      //   console.log('delete axios');

      //   await axios.get(url, config).then(res => {
      //     console.log(res.data.data);
      //     this.setState({
      //       localArray: res.data.data,
      //     });
      //   });

      //   console.log(this.state.localArray, 'aamminn');
      //   let delArray = this.state.localArray.find(x => x.qty == 0)

      //   console.log(delArray, 'nih delete');
      //   console.log(delArray.id_cart, 'detele yang ke ')

      //   await axios.delete(url+'/'+delArray.id_cart)

      // }
    };

    const handleAddQuantity = () => {
      this.setState({Quantity: this.state.Quantity + 1});
      postToCart(1);
    };
    const handleQuantity = bool => {
      let statusQuantity = 0;
      if (bool) {
        this.setState({Quantity: this.state.Quantity + 1});
        statusQuantity = 1;
      } else if (!bool) {
        this.setState({Quantity: this.state.Quantity - 1});
        statusQuantity = 0;
      }
      postToCart(statusQuantity);
    };
    return (
      <TouchableOpacity onPress={() => goToDetail()}>
        <View style={container}>
          <View style={image}>
            <Text
              style={{
                fontSize: 10,
                marginTop: 20,
                padding: 5,
                backgroundColor: 'gray',
                color: 'white',
              }}>
              {this.props.label}
            </Text>
          </View>
          <Text style={name}>{this.props.name}</Text>
          <Text style={{color: 'gray', fontSize: 12}}>
            Imperfect: ukuran buah
          </Text>
          <View style={price}>
            <Text style={priceText}>Rp {this.props.price}</Text>
            <Text style={unit}> / {this.props.unit}</Text>
          </View>
          {this.state.Quantity > 0 ? (
            <View style={kuantity}>
              <TouchableOpacity onPress={() => handleQuantity(false)}>
                <Icon
                  name="minus-circle"
                  type="font-awesome"
                  size={28}
                  color="#00B444"
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginHorizontal: 10,
                }}>
                {this.state.Quantity}
              </Text>
              <TouchableOpacity onPress={() => handleQuantity(true)}>
                <Icon
                  name="plus-circle"
                  type="font-awesome"
                  size={28}
                  color="#00B444"
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={() => handleAddQuantity()}>
              <View style={beli}>
                <Text style={{fontWeight: 'bold', color: 'white'}}>Beli</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => {
  return {
    cardState: state.cartReducer,
  };
};

export default connect(mapStateToProps)(Card);
//export default Card;
