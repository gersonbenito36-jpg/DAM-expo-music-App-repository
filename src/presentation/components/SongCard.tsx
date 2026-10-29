import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Song } from "../../domain/entities/Song";

interface SongCardProps {
  song: Song;
  onPress: () => void;
}

export default function SongCard({ song, onPress }: SongCardProps) {
  const minutes = Math.floor(song.duration / 60);
  const seconds = song.duration % 60;
  const formattedDuration = `${minutes}:${String(seconds).padStart(2, "0")}`;

  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Ver detalles de ${song.title}`}
    >
      <View style={[styles.cover, { backgroundColor: song.coverColor }]}>
        <Text style={styles.musicIcon}>♫</Text>
      </View>
      <View style={styles.information}>
        <Text style={styles.title} numberOfLines={1}>
          {song.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {song.artist}
        </Text>
        <Text style={styles.album} numberOfLines={1}>
          {song.album}
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.duration}>{formattedDuration}</Text>
        <Text style={styles.arrow}>›</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E293B",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  cover: {
    width: 64,
    height: 64,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  musicIcon: { color: "#FFFFFF", fontSize: 34, fontWeight: "bold" },
  information: { flex: 1, marginLeft: 14 },
  title: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  artist: { color: "#CBD5E1", fontSize: 13, marginTop: 4 },
  album: { color: "#94A3B8", fontSize: 12, marginTop: 4 },
  right: { alignItems: "flex-end", marginLeft: 8 },
  duration: { color: "#CBD5E1", fontSize: 12 },
  arrow: { color: "#A78BFA", fontSize: 26, marginTop: 4 },
});
