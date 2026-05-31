from abc import ABC, abstractmethod
from typing import Any


class KVCacheBackend(ABC):
    @abstractmethod
    def save(self, session_id: str, kv_cache: Any) -> None:
        raise NotImplementedError

    @abstractmethod
    def load(self, session_id: str) -> Any:
        raise NotImplementedError

    @abstractmethod
    def delete(self, session_id: str) -> None:
        raise NotImplementedError

    @abstractmethod
    def exists(self, session_id: str) -> bool:
        raise NotImplementedError
