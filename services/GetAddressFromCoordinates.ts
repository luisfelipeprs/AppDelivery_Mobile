export async function getAddressFromCoordinates(latitude: number, longitude: number): Promise<string> {
  try {
    const GOOGLE_MAPS_APIKEY = 'AIzaSyD6s-ANYihojvPFSAhOuIpCKpknzNg6Bts';
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_APIKEY}`
    );

    if (!response.ok) {
      throw new Error(`Erro na resposta da API: ${response.status}`);
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].formatted_address;
    } else {
      return "Endereço não encontrado";
    }
  } catch (error) {
    console.error("Erro ao buscar o endereço:", error);
    return "Erro ao buscar o endereço";
  }
}
