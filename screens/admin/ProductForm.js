import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AntDesign } from "@expo/vector-icons";
import { getAllCategories } from "../../services/categoryService";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { addNewProduct } from "../../services/productService";
import mime from "mime";
const dimensions = Dimensions.get("screen");
export default function ProductForm({ route }) {
  const product = route?.params?.item;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [mainImage, setMainImage] = useState();
  const [image, setImage] = useState();
  useEffect(() => {
    getAllCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));

    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== "granted") {
          alert("Üzügünüm,kamera onayınıza ihtiyaç vardır");
        }
      }
    })();
  }, []);
  const onSubmit = (data) => {
    addNewProduct({
      ...data,
      image: {
        uri: image,
        type: mime.getType(image),
        name: image.split("/").pop(),
      },
      category: category,
    })
      .then(() => {
        console.log("ürün eklendl");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setMainImage(result.uri);
      setImage(result.uri);
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: dimensions.width / 40,
        }}
      >
        <Text style={{ fontSize: dimensions.width / 15, fontWeight: "800" }}>
          Ürün Ekle
        </Text>
      </View>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: product ? product.image : mainImage }}
            />
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              <Entypo
                name="camera"
                size={dimensions.width / 16}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text>Ürün adı</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={product ? product.name : value}
                placeholder="Ürün adı giriniz."
              />
            )}
            name="name"
          />
          {errors.name && <Text>This is required.</Text>}
          <Text>Marka adı</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={product ? product.brand : value}
                placeholder="Marka adı giriniz."
              />
            )}
            name="brand"
          />
          {errors.brand && <Text>This is required.</Text>}

          <Text>Fiyat </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={product ? product.price : value}
                placeholder="Fiyat giriniz."
                keyboardType="numeric"
              />
            )}
            name="price"
          />
          {errors.price && <Text>This is required.</Text>}

          <Text>Stok </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={product ? product.countInStock : value}
                placeholder="Stok giriniz."
                keyboardType="numeric"
              />
            )}
            name="countInStock"
          />
          {errors.countInStock && <Text>This is required.</Text>}

          <Text>Açıklama </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={product ? product.description : value}
                placeholder="Açıklama giriniz."
              />
            )}
            name="description"
          />
          {errors.description && <Text>This is required.</Text>}

          <Text>Açıklama Detay </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={product ? product.richDescription : value}
                placeholder="Açıklama detay giriniz."
              />
            )}
            name="richDescription"
          />
          {errors.richDescription && <Text>This is required.</Text>}

          <TouchableOpacity
            style={styles.modalBtn}
            onPress={() => setModalVisible(true)}
          >
            <Text>Kategori seçiniz</Text>

            <AntDesign
              name="caretdown"
              size={dimensions.width / 30}
              color="black"
            />
          </TouchableOpacity>
          <View
            style={{
              width: dimensions.width,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={handleSubmit(onSubmit)}
            >
              <Text
                style={{
                  fontSize: dimensions.width / 22,
                  fontWeight: "600",
                  color: "#fff",
                }}
              >
                Ürün Ekle
              </Text>
            </TouchableOpacity>
          </View>
          <Modal
            visible={modalVisible}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#EEEEEE",
              }}
            >
              <View style={styles.modalView}>
                {categories.map((c, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.btnTouc}
                    onPress={() => {
                      setCategory(c._id);
                      setModalVisible(false);
                    }}
                  >
                    <Text>{c.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Modal>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: dimensions.width / 45,
    marginVertical: dimensions.width / 45,
  },
  inputContainer: {
    marginHorizontal: dimensions.width / 25,
    marginVertical: dimensions.width / 35,
  },
  input: {
    borderWidth: 0.3,
    borderColor: "rgba(0,0,0,0.3)",
    borderRadius: dimensions.width / 55,
    height: dimensions.height / 15,
    padding: dimensions.width / 70,
    marginVertical: dimensions.width / 50,
  },
  modalBtn: {
    marginVertical: dimensions.width / 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  modalView: {
    width: dimensions.width / 1.5,
    height: dimensions.height / 2,
    borderRadius: dimensions.width / 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  btnTouc: {
    padding: dimensions.width / 35,
    borderBottomWidth: 0.3,
    width: dimensions.width / 1.6,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#E0E0E0",
  },
  confirmBtn: {
    width: dimensions.width / 1.1,
    height: dimensions.height / 15,
    backgroundColor: "#00796B",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: dimensions.width / 25,
    borderRadius: dimensions.width / 45,
    marginRight: dimensions.width / 8,
  },
  imageContainer: {
    width: dimensions.width / 1.7,
    height: dimensions.height / 3,
    borderRadius: dimensions.width / 2,
    borderWidth: dimensions.width / 40,
    borderStyle: "solid",
    borderColor: "#9E9E9E",
  },
  image: {
    width: dimensions.width / 1.85,
    height: dimensions.height / 3.25,
    borderRadius: dimensions.width / 2,
  },
  imagePicker: {
    width: dimensions.width / 9,
    height: dimensions.height / 19,
    backgroundColor: "#616161",
    borderRadius: dimensions.width / 25,
    position: "absolute",
    right: dimensions.width / 30,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
