import {
    BoldFeature,
    ItalicFeature,
    ParagraphFeature,
    lexicalEditor,
    UnderlineFeature,
    LinkFeature,
    HeadingFeature,
    FixedToolbarFeature,
    HorizontalRuleFeature,
    UnorderedListFeature,
    OrderedListFeature,
} from '@payloadcms/richtext-lexical'

export const defaultEditorConfig = lexicalEditor({
    features: ({ rootFeatures }) => {
        return [
            // ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            HorizontalRuleFeature(),
            ParagraphFeature(),
            UnorderedListFeature(),
            OrderedListFeature(),
            UnderlineFeature(),
            BoldFeature(),
            ItalicFeature(),
            LinkFeature(),
        ]
    },
})