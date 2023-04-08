import React, { useEffect, useState } from 'react';
import Option from './components/option'
import Column from './components/column'

const exceptionDatabases = ["mysql", "information_schema", "performance_schema", "sakila", "sys", "world"]

type Response = {
	database_name: string
	TABLE_NAME: string
	schema: Schema
}

const load = async(): Promise<Database[]> => {
	try {
		const res: Awaited<Promise<{ status: string, content: Response[] }>> = (await (await fetch('http://localhost/api/v1/detailed', {
			method: 'GET',
			headers: {
				accept: 'application/json'
			}
		})).json())
		// response we get: { database_name: string, TABLE_NAME: string, schema /**for TABLE_NAME */: Schema  }
		// what we want: { name: string, tables: Table[] }, Table: { name: string, schema: Schema, entries: [] }
		let ret: Database[] = []

		res.content.forEach(({ database_name, TABLE_NAME, schema }) => {
			const found = ret.find(i => i.name === database_name)
			if(found) {
				found.tables = [...found.tables, { name: TABLE_NAME, schema, entries: [] }]
			} else {
				ret = [...ret, { name: database_name, tables: [{ name: TABLE_NAME, schema, entries: [] }] }]
			}
		})

		return ret
	} catch(err) {
		console.error(err)
		return []
	}
}

async function getEntries(db: string, table: string): Promise<Record<keyof Schema, MySqlType>[]> {
	try {
		const json: Awaited<Promise<{ status: 'success' | 'error', content: Record<keyof Schema, MySqlType>[]}>> = (await (await fetch('http://localhost/api/v1/' + db + '/' + table)).json())
		return json.content
	} catch(err) {
		console.error(err)
		return []
	}
}

const App: React.FC = (): JSX.Element => {
	const [databases, setDatabases] = useState<Database[]>([]);
	const [entries, setEntries] = useState<Object[]>([]);
	const [selectedDb, setSelectedDb] = useState<Database | null>(null)
	const [selectedTable, setSelectedTable] = useState<Table | null>(null);

	useEffect(() => {
		load()
		  .then(res => setDatabases(res))
	}, [])

	useEffect(() => {
		if([selectedDb, selectedTable].includes(null)) {
			setEntries([])
		} else if(selectedTable?.entries.length === 0) {
			console.log('hi')
			// fetch rows for selectedTable
			getEntries(selectedDb!.name, selectedTable!.name)
			  .then(res => {
					setEntries(res)
					if(res.length) setSelectedTable((prev: any) => ({ ...prev, entries: res }))
					console.log('res')
				})
		}
	}, [selectedDb, selectedTable])

	return <>
		<div className='h-screen w-screen relative bg-purple-900'>

			{selectedTable ? <div className='h-[60%] w-full center text-center flexer justify-around bg-purple-950'>
				<Column className='flex flex-col w-[60%] overflow-y-auto'>
						<h2 className='w-full h-[10%] border-b-2 text-gray-300 text-xl flexer relative'>
							{selectedTable.name}
							<button className='absolute w-10 h-10 bg-slate-200 text-black font-extrabold flexer left-10' onClick={() => {setSelectedTable(null); setEntries([])}}>{'<--'}</button>
						</h2>
						<div className='flex flex-col h-[90%] w-full overflow-y-auto'>
							<div className='flex w-full h-16'>
								{Object.values(selectedTable.schema).map(({ Field, Type }: any) => <>
									<div className='flex h-fit border-2 border-red-400 border-t-0 text-gray-400 overflow-x-clip' style={{ width: (100 / Object.entries(selectedTable.schema).length).toString() + '%' }}>
										<div className='h-16 w-full flexer border-b-red-400 border-b-2'>
											<span className='w-full h-full text-ellipsis flexer font-bold'>{Field}</span>
										</div>
									</div>
								</>)}
							</div>
							<div className='w-full h-full'>
								{entries.length > 0 ? entries.map(i => <>
									<div className='w-full h-16 flex'>
										{Object.values(i).map(val => <>
											<div className='h-full flexer text-gray-400 border-gray-400 border-2 overflow-x-clip' style={{ width: (100 / Object.keys(entries[0]).length).toString() + '%' }}>{val}</div>
										</>)}
									</div>
								</>) : <span className='center text-gray-400 text-3xl'>No entries</span>}
							</div>
						</div>
				</Column>
			</div> :
				<div className='h-[60%] w-full center text-center flexer justify-around bg-purple-950'>
					<Column>
						{databases.length > 0 ? <>
							{databases.map(db => <Option onMouseOver={() => setSelectedDb(db)} display={db} isSelected={selectedDb?.name === db.name} />)}
						</> : <h2 className='text-2xl font-semibold center text-gray-400 w-full'>No databases</h2>}
					</Column>
		
					<Column>
						{selectedDb ? <>{selectedDb.tables.map(table => <>
							<Option display={table} isSelected={false} onClick={() => setSelectedTable(table)} onMouseOver={() => {}}></Option>
						</>)}</> : <h2 className='text-2xl font-semibold center text-gray-400 w-full'>Select a database</h2>}
					</Column>
				</div>
			}
		</div>
	</>
}

export default App