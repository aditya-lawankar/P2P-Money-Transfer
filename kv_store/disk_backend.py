import os
import pickle
import tempfile
from pathlib import Path
from typing import Any

from .base import KVCacheBackend


class DiskBackend(KVCacheBackend):
    def __init__(self, root_dir: str):
        self.root_dir = Path(root_dir).resolve()
        self.root_dir.mkdir(parents=True, exist_ok=True)

    def _session_path(self, session_id: str) -> Path:
        path = (self.root_dir / f"{session_id}.pkl").resolve()
        if self.root_dir not in path.parents:
            raise ValueError("Invalid session id path")
        return path

    def save(self, session_id: str, kv_cache: Any) -> None:
        file_path = self._session_path(session_id)
        with tempfile.NamedTemporaryFile("wb", dir=self.root_dir, delete=False) as tmp_file:
            pickle.dump(kv_cache, tmp_file, protocol=pickle.HIGHEST_PROTOCOL)
            temp_name = tmp_file.name
        os.replace(temp_name, file_path)

    def load(self, session_id: str) -> Any:
        file_path = self._session_path(session_id)
        if not file_path.exists():
            return None
        with file_path.open("rb") as file:
            return pickle.load(file)

    def delete(self, session_id: str) -> None:
        file_path = self._session_path(session_id)
        if file_path.exists():
            file_path.unlink()

    def exists(self, session_id: str) -> bool:
        return self._session_path(session_id).exists()
