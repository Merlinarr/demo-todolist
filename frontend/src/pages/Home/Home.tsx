import TodoList from "../../components/Todo/Todo";

export default function Home(): JSX.Element {
	return (
		<div className="min-h-screen bg-gradient-to-br from-violet-400 to-fuchsia-500">
			<div className="container mx-auto px-4 py-16">
				<div className="w-full flex justify-center mb-12">
					<div className="text-white text-5xl font-bold tracking-wider drop-shadow-lg">
						Demo ToDo List
					</div>
				</div>
				<div className="max-w-2xl mx-auto">
					<TodoList />
				</div>
			</div>
		</div>
	);
}
