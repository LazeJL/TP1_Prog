import {useStore} from "../hooks/use-cart";


export default function CartCounter() {
    const count = useStore((state) => state.count);
    return (
        <div>{count}</div>
    );
    

}