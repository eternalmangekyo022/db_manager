export {};

declare global {
	
	type Table = {
		name: string
		schema: Schema
		entries: Row[]
	}
	
	type Database = {
		name: string
		tables: Table[]
	}	

	type Schema = {
		Field: string
		Type: string
		Null: 'NO' | 'YES'
		Key: '' | 'PRI' | 'MUL'
		Default: string | number
		Extra: string
	}

	enum MySqlType {
		'VARCHAR',
		'INT',
		'BIGINT',
		'FLOAT',
		'DOUBLE',
		'DECIMAL',
		'DATE',
		'DATETIME',
		'TIMESTAMP',
		'TIME',
		'YEAR',
		'TINYINT',
		'SMALLINT',
		'MEDIUMINT',
		'BIT',
		'BLOB',
		'ENUM',
		'JSON',
		'SET',
		'TEXT',
		'MEDIUMTEXT',
		'LONGTEXT',
		'TINYTEXT'
	  }
	  
	interface Row {
		name: string
		type: sqlTypes
	}
}