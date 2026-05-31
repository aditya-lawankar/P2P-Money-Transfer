from abc import ABC, abstractmethod
from typing import Any


class KVCacheBackend(ABC):
    @abstractmethod
    def save(self, session_id: str, kv_cache: Any) -> None:
        ...

    @abstractmethod
    def load(self, session_id: str) -> Any:
        ...

    @abstractmethod
    def delete(self, session_id: str) -> None:
        ...

    @abstractmethod
    def exists(self, session_id: str) -> bool:
        ...
