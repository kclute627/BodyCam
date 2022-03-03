import { StyleSheet } from "react-native";
import { colors } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkblue,
  },
  container2: {
    
    backgroundColor: colors.darkblue,
  },
  logoView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  logo: {
    height: 200,
    width: 200,
  },
  headerView: {
    

    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  subHeader: {
    color: colors.white,
    fontFamily: "Tajawal_400Regular",
    fontSize: 25,
    fontWeight: "bold",
  },
  header: {
    color: colors.orange,
    fontFamily: "Tajawal_400Regular",
    fontSize: 45,
    fontWeight: "bold",
  },
  signInView: {
    justifyContent: "center",
    alignItems: "center",
  },
  signInInput: {
    paddingBottom: 9,
    width: 290,
    borderBottomColor: colors.white,
    color: colors.white,
    fontSize: 20,
    borderBottomWidth: 2,
    paddingLeft: 45,
  },
  inputView: {
    flexDirection: "row",
    position: "relative",
  },
  icon: {
    position: "absolute",
    left: 5,
    bottom: 9,
  },
  signinBtn: {
    paddingHorizontal: 75,
    paddingVertical: 15,
    backgroundColor: colors.blue,
    borderRadius: 60,
    alignItems: "center",
  },
  btnText: {
    color: colors.white,
    fontSize: 22,
  },
  btnView: {
    marginTop: 35,
  },
  passwordLink: {
    alignSelf: "flex-end",
  },
  passwordLinkText: {
    color: colors.white,
    marginRight: 30,
    marginTop: 20,
  },
  regView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  regText: {
    color: colors.white,
    marginBottom: 5,
  },
  regText2: {
    color: colors.orange,
    fontSize: 15,
    fontWeight: "bold",
  },
  codeText: {
    textTransform: 'capitalize',
    color: colors.white,
    fontSize: 20,
    padding: 10,
    textAlign: 'center'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  code: {
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    marginTop: -150,
  },
  otpInputBox: {
    fontSize: 25,
    backgroundColor: colors.blue,
    color: colors.white,
    padding: 5,
    
    

  },
  otpActive: {
    borderColor: colors.orange,
    borderWidth: 1,
  }
});
