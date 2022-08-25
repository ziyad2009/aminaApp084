
const onReady = (result) => {
    setDistance(Math.ceil(result.distance));
    setTime(Math.ceil(result.duration));
}

<View style={styles.container2}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={Tools.getRegionForCoordinates([
                            driverLocation, 
                            deliveryLocation
                        ])}
                        showsUserLocation={false}
                        showsMyLocationButton={false}
                        zoomEnabled
                        followsUserLocation
                        toolbarEnabled
                        zoomControlEnabled
                    >
                        <MyMapViewDirections
                            origin={driverLocation}
                            destination={deliveryLocation}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={4}
                            strokeColor={'green'}
                            mode={'DRIVING'}
                            onReady={onReady}
                        />
                        <Marker
                            coordinate={driverLocation}
                            title=''
                            description=''
                        />
                        <Marker
                            coordinate={deliveryLocation}
                            title=''
                            description=''
                        />

                    </MapView>
                </View>



const styles = StyleSheet.create({
    container2: {
        height: 250,
        width: "80%",
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
        marginBottom: 20
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    }
})
