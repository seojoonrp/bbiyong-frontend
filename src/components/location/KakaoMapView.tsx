// src/components/location/KakaoMapView.tsx

import colors from "@/src/constants/colors";
import { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

interface KakaoMapViewProps {
  address: string;
  onLocationDetected: (coords: { lat: string; lng: string }) => void;
}

const BASE_URL = "https://3d4thxa-seojoonrp-8081.exp.direct";

export const KakaoMapView = ({
  address,
  onLocationDetected,
}: KakaoMapViewProps) => {
  if (!address || address.trim() === "") {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>주소를 입력하면 지도가 표시됩니다.</Text>
      </View>
    );
  }

  const webViewRef = useRef<WebView>(null);

  const mapHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          html, body { margin: 0; padding: 0; height: 100%; width: 100%; }
          #map { width: 100%; height: 100%; }
        </style>
        <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.EXPO_PUBLIC_KAKAO_MAP_KEY}&libraries=services&autoload=false"></script>
      </head>
      <body>
        <div id="map"></div>
        <script>
          let map;
          let geocoder;

          function sendData(type, data) {
            window.ReactNativeWebView.postMessage(JSON.stringify({ type, ...data }));
          }

          kakao.maps.load(function() {
            const container = document.getElementById('map');
            geocoder = new kakao.maps.services.Geocoder();

            geocoder.addressSearch("${address}", function(result, status) {
              if (status === kakao.maps.services.Status.OK) {
                const initialCoords = new kakao.maps.LatLng(result[0].y, result[0].x);
                map = new kakao.maps.Map(container, { center: initialCoords, level: 3 });

                kakao.maps.event.addListener(map, 'idle', function() {
                  const center = map.getCenter();
                  const lat = center.getLat();
                  const lng = center.getLng();

                  geocoder.coord2Address(lng, lat, function(result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                      const addr = result[0].address;
                      sendData("LOCATION_CHANGED", {
                        lat: lat.toString(),
                        lng: lng.toString(),
                        fullAddress: addr.address_name,
                        regionName: addr.region_3depth_name
                      });
                    }
                  });
                });
              }
            });
          });
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{ html: mapHtml, baseUrl: BASE_URL }}
        onMessage={(e) => {
          const res = JSON.parse(e.nativeEvent.data);
          if (res.type === "LOCATION_CHANGED") {
            onLocationDetected(res);
          }
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={{ flex: 1 }}
      />

      <View style={styles.pinContainer} pointerEvents="none">
        <View style={styles.pinHandle} />
        <View style={styles.pinStick} />
        <View style={styles.pinPoint} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pinContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -8,
    marginTop: -32,
    alignItems: "center",
  },
  pinHandle: {
    width: 16,
    height: 16,
    backgroundColor: colors.main.red,
    borderRadius: 8,
  },
  pinStick: {
    width: 3,
    height: 16,
    backgroundColor: colors.main.red,
    marginTop: -3,
  },
  pinPoint: {
    width: 6,
    height: 6,
    backgroundColor: colors.main.red,
    borderRadius: 4,
    marginTop: -3,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.utils.white,
  },
  emptyText: {
    color: colors.utils.grey,
    fontSize: 14,
  },
});
