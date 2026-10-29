import type { Song } from "../../domain/entities/Song";
import type { SongRepository } from "../../domain/repositories/SongRepository";

export class GetSongById {
  constructor(private readonly repository: SongRepository) {}

  async execute(id: string): Promise<Song | null> {
    if (id.trim() === "") return null;
    return this.repository.getById(id);
  }
}
