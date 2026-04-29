import { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  Camera,
  CameraPosition,
  useCameraPermission,
  usePhotoOutput,
} from 'react-native-vision-camera';
import { Ionicons } from '../../../components/icon';

export default function UploadScreen() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const photoOutput = usePhotoOutput();
  const [cameraPosition, setCameraPosition] = useState<CameraPosition>('back');

  useEffect(() => {
    if (!hasPermission) requestPermission();
  }, [hasPermission, requestPermission]);

  const toggleCamera = () => {
    setCameraPosition((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  return (
    <View className="flex-1 bg-black">
      <Camera
        style={{ flex: 1 }}
        isActive={true}
        device={cameraPosition as any}
        outputs={[photoOutput]}
      />

      <View className="absolute bottom-12 w-full flex-row items-center justify-center">
        {/* Sample Camera Capture Button */}
        <TouchableOpacity className="w-16 h-16 rounded-full bg-white border-4 border-gray-300" />

        {/* Switch Camera Icon */}
        <TouchableOpacity
          className="absolute right-8 bg-black/40 p-3 rounded-full"
          onPress={toggleCamera}
        >
          <Ionicons name="camera-reverse" size={28} className="text-white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
