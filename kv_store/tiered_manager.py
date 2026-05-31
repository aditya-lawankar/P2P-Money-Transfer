from collections import OrderedDict
from typing import Any

from .base import KVCacheBackend


class TieredKVManager:
    def __init__(self, warm_backend: KVCacheBackend, hot_capacity: int = 64):
        self.warm_backend = warm_backend
        self.hot_capacity = max(1, hot_capacity)
        self._hot_cache: "OrderedDict[str, Any]" = OrderedDict()

    def save(self, session_id: str, kv_cache: Any) -> None:
        self._set_hot(session_id, kv_cache)
        self.warm_backend.save(session_id, kv_cache)

    def load(self, session_id: str) -> Any:
        if session_id in self._hot_cache:
            self._hot_cache.move_to_end(session_id)
            return self._hot_cache[session_id]

        cached = self.warm_backend.load(session_id)
        if cached is not None or self.warm_backend.exists(session_id):
            self._set_hot(session_id, cached)
        return cached

    def delete(self, session_id: str) -> None:
        self._hot_cache.pop(session_id, None)
        self.warm_backend.delete(session_id)

    def exists(self, session_id: str) -> bool:
        return session_id in self._hot_cache or self.warm_backend.exists(session_id)

    def in_hot_tier(self, session_id: str) -> bool:
        return session_id in self._hot_cache

    def _set_hot(self, session_id: str, kv_cache: Any) -> None:
        self._hot_cache[session_id] = kv_cache
        self._hot_cache.move_to_end(session_id)
        while len(self._hot_cache) > self.hot_capacity:
            self._hot_cache.popitem(last=False)
