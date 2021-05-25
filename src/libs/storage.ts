import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';



export interface PlantProps {
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
        times: number;
        repeat_every: string
    }
    dateTimeNotification: Date;
}

interface StoragePlantProps {
    [id: string]: {
        data: PlantProps;
    }
}

export async function savePlant(plant: PlantProps): Promise<void> {
    try {
        const data = await AsyncStorage.getItem('@myplants:plants');
        const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

        const newPlant = {
            [plant.id]: {
                data: plant
            }
        }

        await AsyncStorage.setItem('@myplants:plants',
            JSON.stringify({
                ...newPlant,
                ...oldPlants
            }));

    } catch (error) {
        throw new Error(error);
    }
}

export async function loadPlant(): Promise<StoragePlantProps> {
    try {
        const data = await AsyncStorage.getItem('@myplants:plants');
        const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

        return plants;

    } catch (error) {
        throw new Error(error);
    }
}