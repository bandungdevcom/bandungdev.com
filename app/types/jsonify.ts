export type Jsonify<T> = T extends Date
	? string
	: T extends object
	? {
			[k in keyof T]: Jsonify<T[k]>
	  }
	: T
