export const isAllTransferFilters = (transferFilter) => {
	return Object.values(transferFilter).every((filter) => filter)
}