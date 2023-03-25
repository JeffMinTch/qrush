import React, { useState, useEffect } from 'react';
import { FlatList, Image, View, Dimensions } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get('window');


const ImageList = ({ ids, baseUri }) => {
    const [loadedImages, setLoadedImages] = useState([]);
    const [loadingImages, setLoadingImages] = useState([]);
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

    useEffect(() => {
        const updateScreenWidth = () => {
            setScreenWidth(Dimensions.get('window').width);
        };

        Dimensions.addEventListener('change', updateScreenWidth);

        return () => {
            Dimensions.removeEventListener('change', updateScreenWidth);
        };
    }, []);

    const onImageLoad = (id) => {
        setLoadingImages((prev) => prev.filter((loadingId) => loadingId !== id));
        setLoadedImages((prev) => [...prev, id]);
    };

    const renderItem = async ({ item: id }) => {
        const uri = 'http://192.168.178.154:8080/event/image/' + id;
        const imageUrl = await fetchImage(uri);

        return (
            <View style={{ width: screenWidth, height: screenWidth }}>
                <Image
                    source={{ uri: imageUrl }}
                    style={{ flex: 1 }}
                    onLoad={() => onImageLoad(id)}
                />
                {loadingImages.includes(id) && (
                    <Spinner visible={true} />
                )}
            </View>
        );
    };

    const fetchImage = async function({uri}) {
        const response = await fetch(uri, {
            method: 'GET',
          });

          //Response ist schon ein Blob, funktion evtl unnötig
          const imageBlob = await response.blob();
          const imageUrl = URL.createObjectURL(imageBlob);
          return imageUrl;
        }

    return (
        <FlatList
            data={ids}
            renderItem={renderItem}
            keyExtractor={(id) => id}
            horizontal={false}
            pagingEnabled={true}
            snapToInterval={height}
            snapToAlignment="start"
            decelerationRate="fast"
            showsVerticalScrollIndicator={true}
        />
    );
};



export default ImageList;