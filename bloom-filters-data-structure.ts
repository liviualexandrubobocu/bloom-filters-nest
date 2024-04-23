class BloomFilter {
    private size: number;
    private storage: Uint8Array;
    private hashCount: number;

    constructor(size: number, hashCount: number) {
        this.size = size; // The size of the storage array
        this.storage = new Uint8Array(size); // Storage initialized to 0
        this.hashCount = hashCount; // Number of hash functions
    }

    private hash(item: string, seed: number): number {
        let hash = 0;
        for (let i = 0; i < item.length; i++) {
            hash = (hash * seed) + item.charCodeAt(i);
            hash = hash % this.size;
        }
        return hash;
    }

    add(item: string): void {
        for (let i = 0; i < this.hashCount; i++) {
            const position = this.hash(item, i + 1);
            this.storage[position] = 1;
        }
    }

    contains(item: string): boolean {
        for (let i = 0; i < this.hashCount; i++) {
            const position = this.hash(item, i + 1);
            if (this.storage[position] === 0) {
                return false;
            }
        }
        return true;
    }
}

// Usage
const bloom = new BloomFilter(256, 4);
bloom.add("hello");
console.log(bloom.contains("hello"));
console.log(bloom.contains("world"));