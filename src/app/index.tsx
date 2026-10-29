import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import type { Song } from "../domain/entities/Song";
import SongCard from "../presentation/components/SongCard";
import { getSongs } from "../presentation/dependencies/songDependencies";

export default function HomeScreen() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    async function loadSongs() {
      try {
        const result = await getSongs.execute();
        if (active) setSongs(result);
      } catch {
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    }
    loadSongs();
    return () => {
      active = false;
    };
  }, []);

  function openSong(id: string) {
    router.push({ pathname: "/song/[id]", params: { id } });
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#A78BFA" />
        <Text style={styles.message}>Cargando biblioteca musical...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>No fue posible cargar las canciones.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Mi música</Text>
      <Text style={styles.subtitle}>Explora tu biblioteca musical</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Todas las canciones</Text>
        <Text style={styles.counter}>{songs.length} canciones</Text>
      </View>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SongCard song={item} onPress={() => openSong(item.id)} />
        )}
        ListEmptyComponent={
          <Text style={styles.message}>No hay canciones disponibles.</Text>
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  center: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitle: { color: "#94A3B8", fontSize: 14, marginBottom: 30 },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  counter: { color: "#A78BFA", fontSize: 13 },
  list: { paddingBottom: 30 },
  message: {
    color: "#CBD5E1",
    fontSize: 14,
    marginTop: 14,
    textAlign: "center",
  },
});
