import tempfile
import unittest

from kv_store.disk_backend import DiskBackend
from kv_store.tiered_manager import TieredKVManager


class DiskBackendTests(unittest.TestCase):
    def test_save_and_load_roundtrip(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            backend = DiskBackend(temp_dir)
            mock_tensor = {
                "k": [[0.1, 0.2], [0.3, 0.4]],
                "v": [[1.0, 2.0], [3.0, 4.0]],
                "meta": {"shape": [2, 2], "dtype": "float32"},
            }

            backend.save("session-1", mock_tensor)
            loaded = backend.load("session-1")

            self.assertEqual(loaded, mock_tensor)
            self.assertTrue(backend.exists("session-1"))


class TieredKVManagerTests(unittest.TestCase):
    def test_load_from_warm_rehydrates_hot(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            backend = DiskBackend(temp_dir)
            manager = TieredKVManager(backend, hot_capacity=1)
            payload = {"k": [1, 2, 3]}

            manager.save("session-2", payload)
            manager._hot_cache.clear()

            loaded = manager.load("session-2")
            self.assertEqual(loaded, payload)
            self.assertTrue(manager.exists("session-2"))


if __name__ == "__main__":
    unittest.main()
