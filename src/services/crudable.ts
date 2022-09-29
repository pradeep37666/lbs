interface Crudable<T> {
	createOne: (...args: any) => Promise<T>
	getOne: (id: string) => Promise<T>
	getMany?: (...args: any) => Promise<T[]>
	updateOne: (...args: any) => void
	deleteOne: (id: string) => void
}

export default Crudable
