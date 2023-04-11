import React from 'react';
import GithubAutocomplete from './components/GithubAutocomplete';

function App(): JSX.Element {
    return (
        <main className="container mx-auto relative grid min-h-full bg-white  py-4 lg:px-8">
            <div className="text-center">
                <GithubAutocomplete
                    label="Search GitHub repositories:"
                    placeholder="Type user or repository name"
                    options={
                        {
                            /* optionaly customize options based on type GithubAutocompleteOptionsOptional */
                        }
                    }
                />
            </div>
            <div className="px-3">
                {[...Array(3).keys()].map((i: number) => (
                    <p key={i} className="mt-6 text-base leading-7 text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                        tincidunt, nulla ut rutrum congue, velit ipsum elementum nibh, vel
                        dapibus massa nulla ut nisl. Sed bibendum mi lectus, ut mattis
                        elit hendrerit vitae. Cras non ante quis massa elementum feugiat
                        molestie vitae nulla. Suspendisse id ornare mi. Vestibulum in
                        mollis augue. Mauris commodo rhoncus ante, ac rhoncus eros
                        suscipit vel. Nullam at feugiat nibh, placerat dictum lacus.
                        Aenean ornare ex ante, quis cursus massa imperdiet vitae. Quisque
                        vel posuere nunc. Quisque gravida felis in convallis sagittis.
                        Pellentesque scelerisque nec lacus eu sagittis. Maecenas vehicula
                        quis sapien sit amet hendrerit. Cras et elementum lorem. Duis
                        mollis, urna vel dapibus placerat, leo odio finibus purus, et
                        vulputate ipsum dui eu elit. Proin vulputate, metus non laoreet
                        vehicula, mi tortor ultrices augue, vel ultricies magna erat vel
                        est.
                    </p>
                ))}
            </div>

            <footer className="text-center lg:text-right text-xs text-slate-400 py-4">
                Konrad B. &copy; {new Date().getFullYear()}
            </footer>
        </main>
    );
}

export default App;
