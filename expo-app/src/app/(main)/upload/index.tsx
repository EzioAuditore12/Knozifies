import { useState, useEffect } from 'react';
import {
  Button,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  View,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function UploadScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const [albums, setAlbums] = useState<MediaLibrary.Album[]>([]);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  async function getAlbums() {
    const currentPermission =
      permissionResponse ?? (await MediaLibrary.getPermissionsAsync());

    let permissionStatus = currentPermission.status;
    if (permissionStatus !== 'granted') {
      const requestedPermission = await requestPermission();
      permissionStatus = requestedPermission.status;
    }

    if (permissionStatus !== 'granted') {
      setAlbums([]);
      return;
    }

    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });
    setAlbums(fetchedAlbums);
  }

  return (
    <View
      style={{ paddingTop: safeAreaInsets.top }}
      className="flex-1 justify-center items-center"
    >
      <Button onPress={getAlbums} title="Get albums" />
      <ScrollView>
        {albums.map((album) => (
          <AlbumEntry key={album.id} album={album} />
        ))}
      </ScrollView>
    </View>
  );
}

function AlbumEntry({ album }: { album: MediaLibrary.Album }) {
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);

  useEffect(() => {
    async function getAlbumAssets() {
      const albumAssets = await MediaLibrary.getAssetsAsync({ album });
      setAssets(albumAssets.assets);
    }
    getAlbumAssets();
  }, [album]);

  return (
    <View style={styles.albumContainer}>
      <Text>
        {album.title} - {album.assetCount ?? 'no'} assets
      </Text>
      <View style={styles.albumAssetsContainer}>
        {assets.map((asset) => (
          <Image
            key={asset.id}
            source={{ uri: asset.uri }}
            style={styles.assetImage}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    justifyContent: 'center',
  },
  albumContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
    gap: 4,
  },
  albumAssetsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  assetImage: {
    width: 50,
    height: 50,
  },
});
