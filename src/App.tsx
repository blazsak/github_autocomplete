import React from 'react';
import GithubAutocomplete from './components/GithubAutocomplete';

function App(): JSX.Element {
    return (
        <main className="grid min-h-full bg-white  py-4 lg:px-8">
            <div className="text-center">
                <GithubAutocomplete
                    label="Search GitHub repositories:"
                    placeholder="Type user or repository name"
                />

                {[...Array(20).keys()].map((i: number) => (
                    <p key={i} className="mt-6 text-base leading-7 text-gray-600">
                        Default page
                    </p>
                ))}
            </div>

            <footer className="fixed bottom-4 right-4 text-xs text-slate-400">
                &copy; {new Date().getFullYear()}
            </footer>
        </main>
    );
}

export default App;
