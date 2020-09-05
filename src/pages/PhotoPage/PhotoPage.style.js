import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    Main: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#E5E5E5"
    },
    TopBlock: {
        backgroundColor: "#FFFFFF",
        flex: 0.6
    },
    CameraBlock: {
        flex: 2.3
    },
    BottomBlock: {
        backgroundColor: "#FFFFFF",
        flex: 1
    },
    BottomPanel: {
        flex: 1,
        flexDirection: "row"
    },
    FlipView: {
        flex: 1,
        justifyContent: "center"
    },
    FlipImage: {
        alignSelf: "center",
        width: 40,
        height: 40
    },
    TakeView: {
        flex: 2,
        justifyContent: "center"
    },
    TakeButton: {
        alignSelf: "center",
        height: 100,
        width: 100,
        backgroundColor: "red",
        borderRadius: 50,
        shadowColor: "black",
        shadowRadius: 5,
        shadowOpacity: 0.5,
        borderColor: "white",
        borderWidth: 10
    },
});