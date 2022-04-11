import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";

const dimensions = Dimensions.get("screen");
export default function CategoryFilter({
  categories,
  changeCategory,
  active,
  setActive,
  productCategory,
}) {
  return (
    <View style={styles.container}>
      <ScrollView
        bounces={true}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          key={1}
          onPress={() => {
            changeCategory("all");
            setActive(-1);
          }}
        >
          <View
            style={[
              styles.customBadge,
              active == -1 ? styles.active : styles.inactive,
            ]}
          >
            <Text
              style={{
                fontSize: dimensions.width / 28,
                color: "#fff",
                fontWeight: "700",
              }}
            >
              Tümü
            </Text>
          </View>
        </TouchableOpacity>
        {categories.map((c) => (
          <TouchableOpacity
            key={c._id}
            onPress={() => {
              changeCategory(c._id);
              setActive(categories.indexOf(c));
            }}
          >
            <View
              style={[
                styles.customBadge,
                active == categories.indexOf(c)
                  ? styles.active
                  : styles.inactive,
              ]}
            >
              <Text
                style={{
                  fontSize: dimensions.width / 28,
                  color: "#fff",
                  fontWeight: "700",
                }}
              >
                {c.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    marginVertical: dimensions.width / 85,
    width: dimensions.width,
    height: dimensions.height / 12,
    alignItems: "center",
    flexDirection: "row",
  },
  customBadge: {
    width: dimensions.width / 4.5,
    height: dimensions.height / 25,
    backgroundColor: "#009688",
    borderRadius: dimensions.width / 25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: dimensions.width / 35,
  },
  active: {
    backgroundColor: "#009688",
  },
  inactive: {
    backgroundColor: "#80CBC4",
  },
});
