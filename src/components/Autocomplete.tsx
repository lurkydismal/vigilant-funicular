import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { Autocomplete, TextField } from '@mui/material';

export default function Highlights({ options, ...props }: { options: any }) {
    return (
        <Autocomplete
            {...props}
            options={options}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
                <TextField {...params} label="Highlights" margin="normal" />
            )}
            renderOption={(props, option, { inputValue }) => {
                const { key, ...optionProps } = props;
                const matches = match(option.title, inputValue, { insideWords: true });
                const parts = parse(option.title, matches);

                return (
                    <li key={key} {...optionProps}>
                        <div>
                            {parts.map((part, index) => (
                                <span
                                    key={index}
                                    style={{
                                        fontWeight: part.highlight ? 700 : 400,
                                    }}
                                >
                                    {part.text}
                                </span>
                            ))}
                        </div>
                    </li>
                );
            }}
        />
    );
}
