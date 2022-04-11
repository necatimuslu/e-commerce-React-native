import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import ProductSearch from "./ProductSearch";
import {
  deleteCategory,
  getAllCategories,
} from "../../services/categoryService";
import { AntDesign } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
const dimensions = Dimensions.get("screen");
export default function Categories({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchAllCategories();
  }, []);
  const fetchAllCategories = () => {
    getAllCategories()
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = (id) => {
    deleteCategory(id)
      .then(() => {
        Toast.show({
          type: "error",
          text1: "Başarılı",
          text2: "Kategori silindi",
        });
        fetchAllCategories();
      })
      .catch((err) => console.log(err));
  };
  return (
    <View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: dimensions.height / 80,
        }}
      >
        <TouchableOpacity
          style={styles.headBtn}
          onPress={() => navigation.navigate("category-form")}
        >
          <AntDesign name="plus" size={dimensions.width / 20} color="#fff" />
          <Text
            style={{
              color: "#fff",
              fontSize: dimensions.width / 22,
              fontWeight: "700",
            }}
          >
            Kategori Ekle
          </Text>
        </TouchableOpacity>
      </View>
      <ProductSearch keyword={keyword} setKeyword={setKeyword} />
      <View style={styles.titleCon}>
        <Text style={styles.titleText}>Kategori adı</Text>

        <Text style={styles.titleText}>Aksiyon</Text>
      </View>
      <Toast />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <TouchableOpacity onLongPress={() => setModalVisible(true)}>
          {categories
            .filter((x) => x.name.toLowerCase().includes(keyword))
            .map((p, i) => (
              <TouchableOpacity
                key={p._id}
                onPress={() =>
                  navigation.navigate("category-form", { item: p })
                }
              >
                <View
                  style={[
                    styles.cardContainer,
                    { backgroundColor: i % 2 == 0 ? "white" : "gainsboro" },
                  ]}
                >
                  <Text style={styles.textStyle}>
                    {p?.name.length > 30
                      ? p.name.substring(0, 30) + "..."
                      : p.name}
                  </Text>

                  <Pressable
                    style={styles.presBtn}
                    onPress={() => handleDelete(p?._id)}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: dimensions.width / 25,
                      }}
                    >
                      Sil
                    </Text>
                  </Pressable>
                </View>
              </TouchableOpacity>
            ))}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: dimensions.width / 40,
    marginHorizontal: dimensions.width / 35,
  },
  cardContainer: {
    flexDirection: "row",
    width: dimensions.width / 1.05,
    height: dimensions.height / 20,
    marginVertical: dimensions.width / 40,
    marginHorizontal: dimensions.width / 80,
    alignItems: "center",
    justifyContent: "space-between",
  },
  presBtn: {
    height: dimensions.width / 20,
    width: dimensions.width / 15,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: dimensions.width / 65,
    marginLeft: dimensions.width / 90,
  },
  titleCon: {
    flexDirection: "row",
    width: dimensions.width / 1.1,
    height: dimensions.height / 40,
    marginVertical: dimensions.width / 40,
    marginHorizontal: dimensions.width / 40,
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: dimensions.width / 25,
    fontWeight: "600",
  },
  headBtn: {
    height: dimensions.height / 15,
    backgroundColor: "#F57C00",
    width: dimensions.width / 2.5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: dimensions.height / 45,
    flexDirection: "row",
  },
});
