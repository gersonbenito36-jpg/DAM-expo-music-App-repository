import type { Song } from "../../domain/entities/Song";
import type { SongRepository } from "../../domain/repositories/SongRepository";

const songs: Song[] = [
  {
    id: "1",
    title: "Within",
    artist: "Andrea Ribeca feat. Lokka ",
    album: "Within - Single",
    duration: 236, // 3:56 en versión Radio / Single
    coverColor: "#7C3AED",
  },
  {
    id: "2",
    title: "Footprints In The Sand",
    artist: "Phillip J feat. Kim Casandra",
    album: "Footprints In The Sand - Single",
    duration: 228, // 3:48 en versión Radio Edit
    coverColor: "#2563EB",
  },
  {
    id: "3",
    title: "We Control The Sunlight",
    artist: "Aly & Fila feat. Jwaydan",
    album: "Quiet Storm",
    duration: 227, // 3:47
    coverColor: "#0D9488",
  },
  {
    id: "4",
    title: "Plump",
    artist: "Andrea Ribeca",
    album: "Plump - Single",
    duration: 215, // 3:35
    coverColor: "#DB2777",
  },
  {
    id: "5",
    title: "Gravity",
    artist: "Aly & Fila vs Deirdre McLaughlin",
    album: "Beyond The Lights",
    duration: 255, // 4:15
    coverColor: "#9333EA",
  },
  {
    id: "6",
    title: "Sun & Moon",
    artist: "Above & Beyond feat. Richard Bedford",
    album: "Group Therapy",
    duration: 325, // 5:25
    coverColor: "#EA580C",
  },
];
export class LocalSongRepository implements SongRepository {
  async getAll(): Promise<Song[]> {
    return [...songs];
  }

  async getById(id: string): Promise<Song | null> {
    return songs.find((item) => item.id === id) ?? null;
  }
}
