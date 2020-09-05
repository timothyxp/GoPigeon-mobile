import {StyleSheet, Dimensions} from 'react-native'

let BigButtonSize = 80;
let ScreenWidth = Dimensions.get('window').width;
let ScreenHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
    Main: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#E5E5E5"
    },
    TakedPhoto: {
        width: ScreenWidth,
        height: ScreenHeight,
    },
    SmallInfoBlock: {
        width: ScreenWidth - 20,
        borderRadius: 35,
        marginBottom: 30,
        marginLeft: 10,
        marginTop: 10,
        height: 260,
        overflow: "hidden",
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    InfoBlock: {
        flexDirection: "column"
    },
    DescriptionBlock: {
        flexDirection: "row",
        height: 100
    },
    TextDescriptionBlock: {
        flexDirection: "column",
        flex: 1,
        marginLeft: 20,
        justifyContent: "center",
        alignItems: "flex-start"
    },
    DescriptionName: {
        fontWeight: 'bold',
        fontSize: 22,
        lineHeight: 28
    },
    DescriptionDescription: {
        fontWeight: "500",
        fontSize: 12,
        lineHeight: 16,
        color: 'rgba(60, 60, 67, 0.6)'
    },
    DescriptionImage: {
        width: ScreenWidth - 20,
        height: 160,
        alignSelf: "flex-start",
        backgroundColor: "red"
    },
    SmallInfoExitButton: {
        backgroundColor: 'rgb(211, 214, 205)',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: "center",
        position: 'absolute',
        top: 15,
        right: 15
    },
    DetailedButtonBlock: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    DetailedButton: {
        backgroundColor: '#007AFF',
        borderRadius: 50,
        width: 130,
        height: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    DetailedText: {
        fontStyle: 'normal',
        fontWeight: "600",
        fontSize: 17,
        lineHeight: 22
    },
    TopBlock: {
        backgroundColor: "#FFFFFF",
        flex: 0.6
    },
    CameraBlock: {
        flex: 2.3
    },
    BottomBlock: {
        flex: 1,
        position: 'absolute',
        bottom: 0
    },
    BottomPanel: {
        flex: 1,
        flexDirection: "row",
        width: Dimensions.get('window').width,
        marginBottom: 30
    },
    FlipView: {
        flex: 1,
        justifyContent: "center",
    },
    FlipButton: {
        alignSelf: "flex-end",
        width: 50,
        height: 50,
        justifyContent: "center",
        backgroundColor: "rgba(27,27,27, 0.2)",
        borderRadius: 25,
        borderColor: "rgba(255, 255, 255, 0.3)",
        borderWidth: 1
    },
    FlipImage: {
        alignSelf: "center",
        width: 20,
        height: 20
    },
    TakeView: {
        flex: 2,
        justifyContent: "center"
    },
    TakeButton: {
        alignSelf: "center",
        justifyContent: "center",
        height: BigButtonSize,
        width: BigButtonSize,
        backgroundColor: "rgba(27,27,27, 0.2)",
        borderRadius: BigButtonSize/2,
        borderColor: "rgba(255, 255, 255, 0.3)",
        borderWidth: 1
    },
    TakeImage: {
        alignSelf: "center",
        width: 30,
        height: 22
    }
});