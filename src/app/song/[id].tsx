import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { Song } from "../../domain/entities/Song";
import { getSongById } from "../../presentation/dependencies/songDependencies";

export default function SongDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    async function loadSong() {
      setLoading(true);
      setError(false);
      setSong(null);
      try {
        const result = await getSongById.execute(id ?? "");
        if (active) setSong(result);
      } catch {
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    }
    loadSong();
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#A78BFA" />
        <Text style={styles.message}>Cargando información...</Text>
      </View>
    );
  }

  if (error || !song) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>No se encontró la canción.</Text>
      </View>
    );
  }

  const minutes = Math.floor(song.duration / 60);
  const seconds = song.duration % 60;
  const formattedDuration = `${minutes}:${String(seconds).padStart(2, "0")}`;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.cover, { backgroundColor: song.coverColor }]}>
        <Text style={styles.musicIcon}>♫</Text>
      </View>
      <Text style={styles.title}>{song.title}</Text>
      <Text style={styles.artist}>{song.artist}</Text>
      <View style={styles.information}>
        <Text style={styles.sectionTitle}>Información de la canción</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Artista</Text>
          <Text style={styles.value}>{song.artist}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>Álbum</Text>
          <Text style={styles.value}>{song.album}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>Duración</Text>
          <Text style={styles.value}>{formattedDuration}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  content: { padding: 24, alignItems: "center", paddingBottom: 40 },
  center: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
  },
  cover: {
    width: 260,
    height: 260,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 28,
  },
  musicIcon: { color: "#FFFFFF", fontSize: 110, fontWeight: "bold" },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
  },
  artist: { color: "#A78BFA", fontSize: 18, marginTop: 8 },
  information: {
    width: "100%",
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 20,
    marginTop: 35,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  label: { color: "#94A3B8", fontSize: 14 },
  value: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    flexShrink: 1,
    textAlign: "right",
    marginLeft: 12,
  },
  divider: { height: 1, backgroundColor: "#334155", marginVertical: 6 },
  message: { color: "#CBD5E1", fontSize: 14, marginTop: 12 },
});
