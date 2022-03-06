import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";
import { styles } from "../screens/signIn/styles";

export const InputView = ({
  icon,
  autoCompleteType,
  placeholder,
  returnKeyType,
  value,
  refs,
  setFormData,
  formData,
  title,
  padding,
  secureTextEntry,
}) => (
  <View
    style={
      padding ? [styles.inputView, { paddingTop: 35 }] : [styles.inputView]
    }
  >
    <MaterialCommunityIcons
      name={icon}
      color="white"
      size={30}
      style={styles.icon}
    />
    <TextInput
      style={styles.signInInput}
      autoCompleteType={autoCompleteType}
      keyboardType="default"
      placeholder={placeholder}
      placeholderTextColor={"gray"}
      returnKeyType={returnKeyType}
      value={value}
      onSubmitEditing={() => {
        refs && refs.current?.focus();
      }}
      onChangeText={(value) => {
        setFormData({ ...formData, [title]: value });
      }}
      secureTextEntry={secureTextEntry ? true : false}
    />
  </View>
);
