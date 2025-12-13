/**
 * Priority Queue Implementation
 * Used for chunk loading prioritization based on distance
 */

export interface PriorityQueueItem<T> {
  item: T
  priority: number
}

/**
 * Min-heap based priority queue
 * Lower priority values are dequeued first
 */
export class PriorityQueue<T> {
  private heap: PriorityQueueItem<T>[] = []

  /**
   * Get the number of items in the queue
   */
  get size(): number {
    return this.heap.length
  }

  /**
   * Check if the queue is empty
   */
  get isEmpty(): boolean {
    return this.heap.length === 0
  }

  /**
   * Add an item with a priority
   * @param item The item to add
   * @param priority Lower values = higher priority (dequeued first)
   */
  enqueue(item: T, priority: number): void {
    this.heap.push({ item, priority })
    this.bubbleUp(this.heap.length - 1)
  }

  /**
   * Remove and return the highest priority item (lowest priority value)
   * @returns The item with the lowest priority value, or undefined if empty
   */
  dequeue(): T | undefined {
    if (this.heap.length === 0) return undefined
    if (this.heap.length === 1) return this.heap.pop()!.item

    const result = this.heap[0]!.item
    this.heap[0] = this.heap.pop()!
    this.bubbleDown(0)
    return result
  }

  /**
   * Peek at the highest priority item without removing it
   */
  peek(): T | undefined {
    return this.heap[0]?.item
  }

  /**
   * Clear all items from the queue
   */
  clear(): void {
    this.heap = []
  }

  /**
   * Check if an item exists in the queue (using a comparator)
   */
  contains(predicate: (item: T) => boolean): boolean {
    return this.heap.some(entry => predicate(entry.item))
  }

  /**
   * Remove an item from the queue (using a comparator)
   * @returns true if item was found and removed
   */
  remove(predicate: (item: T) => boolean): boolean {
    const index = this.heap.findIndex(entry => predicate(entry.item))
    if (index === -1) return false

    if (index === this.heap.length - 1) {
      this.heap.pop()
    } else {
      this.heap[index] = this.heap.pop()!
      this.bubbleDown(index)
      this.bubbleUp(index)
    }
    return true
  }

  /**
   * Get all items as an array (not in priority order)
   */
  toArray(): T[] {
    return this.heap.map(entry => entry.item)
  }

  /**
   * Bubble up an element to maintain heap property
   */
  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2)
      if (this.heap[parentIndex]!.priority <= this.heap[index]!.priority) break
      this.swap(index, parentIndex)
      index = parentIndex
    }
  }

  /**
   * Bubble down an element to maintain heap property
   */
  private bubbleDown(index: number): void {
    const length = this.heap.length

    while (true) {
      const leftChild = 2 * index + 1
      const rightChild = 2 * index + 2
      let smallest = index

      if (leftChild < length && this.heap[leftChild]!.priority < this.heap[smallest]!.priority) {
        smallest = leftChild
      }

      if (rightChild < length && this.heap[rightChild]!.priority < this.heap[smallest]!.priority) {
        smallest = rightChild
      }

      if (smallest === index) break

      this.swap(index, smallest)
      index = smallest
    }
  }

  /**
   * Swap two elements in the heap
   */
  private swap(i: number, j: number): void {
    const temp = this.heap[i]!
    this.heap[i] = this.heap[j]!
    this.heap[j] = temp
  }
}
