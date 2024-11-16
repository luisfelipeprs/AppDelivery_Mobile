import { useWebSocketTracking } from '@/services/WebSocketTracking';
import { Modal, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';

interface ModalWaitingAcceptDeliveryProps {
  visible: boolean;
  onCancel: () => void;
}

const ModalWaitingAcceptDelivery: React.FC<ModalWaitingAcceptDeliveryProps> = ({ visible, onCancel }) => {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View className="flex-1 justify-end items-center bg-[#00000052] bg-opacity-50">
        <View className="w-full bg-white rounded-t-3xl p-5 items-center">
          <Text className="text-lg mb-4">Procurando entregador...</Text>
          <ActivityIndicator size="large" color="#00ff00" />

          <TouchableOpacity className="bg-red-500 mt-6 py-2 px-4 rounded-lg" onPress={onCancel}>
            <Text className="text-white text-base">Cancelar Pedido</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default ModalWaitingAcceptDelivery;