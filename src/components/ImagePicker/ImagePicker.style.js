import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    GalleryView: {
        flex: 1,
        justifyContent: "center"
    },
    GalleryButton: {
        width: 50,
        height: 50,
        justifyContent: "center",
        backgroundColor: "rgba(27,27,27, 0.2)",
        borderRadius: 25,
        borderColor: "rgba(255, 255, 255, 0.3)",
        borderWidth: 1,
    },
    GalleryImage: {
        alignSelf: "center",
        width: 12,
        height: 20,
    }
});
