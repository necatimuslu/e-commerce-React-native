import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";
import { getAllCategories } from "../../services/categoryService";
const dimensons = Dimensions.get("screen");
import { getAllProducts } from "../../services/productService";
import Banner from "../../shared/Banner";
import Header from "../../shared/Header";
import { SearchInput } from "../../shared/SearchInput";
import CategoryFilter from "./CategoryFilter";
import { ProductList } from "./ProductList";
import SearchProductList from "./SearchProductList";

export default function ProductContainer({ navigation }) {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState();
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        setProducts(res.data);
        setProductCategory(res.data);
        setInitialState(res.data);
      })
      .catch((err) => console.log(err));

    getAllCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));

    return () => {
      setProducts([]);
      setCategories([]);
      setFocus();
      setActive(-1);
      setInitialState([]);
    };
  }, []);

  const searchProduct = () => {
    return products.filter((p) => p.name.toLowerCase().includes(keyword));
  };
  const onFocus = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };
  const changeCategory = (category) => {
    {
      category == "all"
        ? [setProductCategory(initialState), setActive(true)]
        : [
            setProductCategory(
              products.filter((x) => x.category._id === category)
            ),
            setActive(true),
          ];
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <SearchInput
        keyword={keyword}
        setKeyword={setKeyword}
        onFocus={onFocus}
        onBlur={onBlur}
        focus={focus}
      />
      {focus == undefined ? <Banner /> : focus == false && <Banner />}
      <CategoryFilter
        categories={categories}
        changeCategory={changeCategory}
        productCategory={productCategory}
        active={active}
        setActive={setActive}
      />
      <Toast position="top" bottomOffset={10} />
      {focus == true ? (
        <SearchProductList products={searchProduct()} />
      ) : (
        <>
          {productCategory.length > 0 ? (
            <FlatList
              data={productCategory}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("product-detail", { item: item })
                  }
                >
                  <ProductList item={item} Toast={Toast} />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item._id}
              numColumns={2}
              key={1}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <FlatList
              data={keyword == undefined ? products : searchProduct()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("product-detail", { item: item })
                  }
                >
                  <ProductList item={item} Toast={Toast} />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item._id}
              numColumns={2}
              key={1}
              showsVerticalScrollIndicator={false}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: dimensons.height / 30,
  },
});
