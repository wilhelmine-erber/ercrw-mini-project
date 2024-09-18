

export default function Example() {

    return (
        <header className="bg-white">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">

                <div className="flex lg:flex-1">
                </div>

                <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                    Features
                </a>
                <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                    Marketplace
                </a>
                <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                    Company
                </a>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        Log in <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>
        </header>
    )
}
