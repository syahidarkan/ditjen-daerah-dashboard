
sed -i '1s/import { useEffect } from "react";//' src/components/dashboard/DataForm.tsx
sed -i 's/setValue,//' src/components/dashboard/DataForm.tsx


sed -i 's/import { ColumnDef }/import type { ColumnDef }/' src/components/dashboard/TableColumns.tsx
sed -i 's/import { DataGaji }/import type { DataGaji }/' src/components/dashboard/TableColumns.tsx


sed -i 's/, useEffect//' src/hooks/useLocalStorage.ts

echo "Fixes applied!"
