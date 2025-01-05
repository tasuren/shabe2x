import { usePaper } from "./Context";

function Paper() {
	const [_, setPaper] = usePaper();

	return (
		<article
			class="mx-3 md:m-0 p-2 md:w-full outline outline-1 min-h-[80%]"
			contenteditable={true}
			ref={setPaper}
		/>
	);
}

export default Paper;
