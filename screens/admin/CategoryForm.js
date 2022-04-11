import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { addNewCategory } from "../../services/categoryService";
import Toast from "react-native-toast-message";
const dimensions = Dimensions.get("screen");
export default function CategoryForm({ navigation, route }) {
  const category = route?.params?.item;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    addNewCategory(data)
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Başarılı",
          text2: "Kategori eklendi",
        });
        navigation.navigate("categories");
      })
      .catch((err) => console.log(err));
  };
  return (
    <View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: dimensions.width / 15,
        }}
      >
        <Text style={{ fontSize: dimensions.width / 19, fontWeight: "600" }}>
          Kategori Form
        </Text>
      </View>
      <View style={styles.inputContainer}>
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
              value={category ? category.name : value}
              placeholder="Kategori adı giriniz"
            />
          )}
          name="name"
        />
        {errors.name && <Text style={styles.errorText}>This is required.</Text>}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: dimensions.width / 30,
          }}
        >
          <Pressable style={styles.presbtn} onPress={handleSubmit(onSubmit)}>
            {category ? (
              <Text style={{ color: "#fff", fontSize: dimensions.width / 25 }}>
                Güncelle
              </Text>
            ) : (
              <Text style={{ color: "#fff", fontSize: dimensions.width / 25 }}>
                Ekle
              </Text>
            )}
          </Pressable>
        </View>
      </View>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: dimensions.width / 25,
    marginHorizontal: dimensions.width / 25,
  },
  inputContainer: {
    width: dimensions.width / 1.1,
    marginLeft: dimensions.width / 30,
  },
  errorText: {
    fontSize: dimensions.width / 27,
    color: "red",
  },
  input: {
    borderWidth: 0.3,
    borderColor: "rgba(0,0,0,0.3)",
    borderRadius: dimensions.width / 55,
    height: dimensions.height / 15,
    padding: dimensions.width / 70,
    marginVertical: dimensions.width / 50,
  },
  presbtn: {
    height: dimensions.height / 20,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: dimensions.width / 3.5,
    borderRadius: dimensions.width / 40,
  },
});
