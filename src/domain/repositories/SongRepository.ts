import type { Song } from "../entities/Song";

export interface SongRepository {
  getAll(): Promise<Song[]>;
  getById(id: string): Promise<Song | null>;
}
