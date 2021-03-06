const config = {
    defaultColors: [
        {
            color: "#110305",
            label: "theme"
        },
        {
            color: "#991b1e",
            label: "accent"
        },
        {
            color: "#110305",
            label: "primary"
        },
        {
            color: "#991b1e",
            label: "secondary"
        },
        {
            color: "#FAFFFF",
            label: "tertiary",
            hasBorder: true
        },
        {
            color: "#0d6efd",
            label: "info"
        },
        {
            color: "#20c997",
            label: "success"
        },
        {
            color: "#fd7e14",
            label: "warning"
        },
        {
            color: "#dc3545",
            label: "danger"
        },
        {
            color: "#f8f9fa",
            label: "light",
            hasBorder: true
        },
        {
            color: "#212529",
            label: "dark"
        },
        {
            color: "#0d6efd",
            label: "blue"
        },
        {
            color: "#6610f2",
            label: "indigo"
        },
        {
            color: "#6f42c1",
            label: "purple"
        },
        {
            color: "#d63384",
            label: "pink"
        },
        {
            color: "#dc3545",
            label: "red"
        },
        {
            color: "#fd7e14",
            label: "orange"
        },
        {
            color: "#ffc107",
            label: "yellow"
        },
        {
            color: "#198754",
            label: "green"
        },
        {
            color: "#20c997",
            label: "teal"
        },
        {
            color: "#0dcaf0",
            label: "cyan"
        },
        {
            color: "#fff",
            label: "white",
            hasBorder: true
        },
        {
            color: "#000",
            label: "black"
        },
        {
            color: "#6c757d",
            label: "gray"
        },
        {
            color: "#343a40",
            label: "gray-dark"
        }],
    fontFamily: {
        options: ["default", "Cormorant Garamond", "Montserrat", "Nothing You Could Do,cursive", "'Pacifico', cursive", "Fascinate"]
    },
    generalSelectClass: [
        {
            label: "Animation on hover",
            groups: [
                {
                    values: [
                        {
                            title: "grow",
                            value: "grow"
                        },
                        {
                            title: "shrink",
                            value: "shrink"
                        },
                        {
                            title: "pulse",
                            value: "pulse"
                        },
                        {
                            title: "pulse grow",
                            value: "pulse-grow"
                        },
                        {
                            title: "pulse shrink",
                            value: "pulse-shrink"
                        },
                        {
                            title: "push",
                            value: "push"
                        },
                        {
                            title: "pop",
                            value: "pop"
                        },
                        {
                            title: "bounce in",
                            value: "bounce-in"
                        },
                        {
                            title: "bounce out",
                            value: "bounce-out"
                        },
                        {
                            title: "rotate",
                            value: "rotate"
                        },
                        {
                            title: "grow rotate",
                            value: "grow-rotate"
                        },
                        {
                            title: "float",
                            value: "float"
                        },
                        {
                            title: "sink",
                            value: "sink"
                        },
                        {
                            title: "bob",
                            value: "bob"
                        },
                        {
                            title: "hang",
                            value: "hang"
                        },
                        {
                            title: "skew",
                            value: "skew"
                        },
                        {
                            title: "skew forward",
                            value: "skew-forward"
                        },
                        {
                            title: "skew backward",
                            value: "skew-backward"
                        },
                        {
                            title: "wobble vertical",
                            value: "wobble-y"
                        },
                        {
                            title: "wobble horizontal",
                            value: "wobble-x"
                        },
                        {
                            title: "wobble to bottom right",
                            value: "wobble-to-bottom-right"
                        },
                        {
                            title: "wobble to top right",
                            value: "wobble-to-top-right"
                        },
                        {
                            title: "wobble top",
                            value: "wobble-top"
                        },
                        {
                            title: "wobble bottom",
                            value: "wobble-bottom"
                        },
                        {
                            title: "wobble skew",
                            value: "wobble-skew"
                        },
                        {
                            title: "buzz",
                            value: "buzz"
                        },
                        {
                            title: "buzz out",
                            value: "buzz-out"
                        },
                        {
                            title: "forward",
                            value: "forward"
                        },
                        {
                            title: "backward",
                            value: "backward"
                        }],
                    suffix: "[-\\w]+",
                    variants: [
                        {
                            label: "2D transition",
                            prefix: "hvr-2d-"
                        }]
                },
                {
                    values: [
                        {
                            title: "fade",
                            value: "fade"
                        },
                        {
                            title: "pulse",
                            value: "pulse"
                        },
                        {
                            title: "sweep right",
                            value: "sweep-right"
                        },
                        {
                            title: "sweep left",
                            value: "sweep-left"
                        },
                        {
                            title: "sweep bottom",
                            value: "sweep-bottom"
                        },
                        {
                            title: "sweep top",
                            value: "sweep-top"
                        },
                        {
                            title: "bounce right",
                            value: "bounce-right"
                        },
                        {
                            title: "bounce left",
                            value: "bounce-left"
                        },
                        {
                            title: "bounce bottom",
                            value: "bounce-bottom"
                        },
                        {
                            title: "bounce top",
                            value: "bounce-top"
                        },
                        {
                            title: "radial out",
                            value: "radial-out"
                        },
                        {
                            title: "radial in",
                            value: "radial-in"
                        },
                        {
                            title: "rectangle in",
                            value: "rect-in"
                        },
                        {
                            title: "rectangle out",
                            value: "rect-out"
                        },
                        {
                            title: "shutter in horizontal",
                            value: "shutter-in-x"
                        },
                        {
                            title: "shutter out horizontal",
                            value: "shutter-out-x"
                        },
                        {
                            title: "shutter in vertical",
                            value: "shutter-in-y"
                        },
                        {
                            title: "shutter out vertical",
                            value: "shutter-out-y"
                        }],
                    suffix: "[-\\w]+",
                    variants: [
                        {
                            label: "background transition",
                            prefix: "hvr-bg-"
                        }]
                },
                {
                    values: [
                        {
                            title: "fade",
                            value: "fade"
                        },
                        {
                            title: "hollow",
                            value: "hollow"
                        },
                        {
                            title: "trim",
                            value: "trim"
                        },
                        {
                            title: "ripple out",
                            value: "ripple-out"
                        },
                        {
                            title: "ripple in",
                            value: "ripple-in"
                        },
                        {
                            title: "outline out",
                            value: "outline-out"
                        },
                        {
                            title: "outline in",
                            value: "outline-in"
                        },
                        {
                            title: "round corners",
                            value: "round-corners"
                        },
                        {
                            title: "underline from left",
                            value: "overline-left"
                        },
                        {
                            title: "underline from center",
                            value: "underline-right"
                        },
                        {
                            title: "overline from center",
                            value: "overline-center"
                        },
                        {
                            title: "overline from right",
                            value: "overline-right"
                        },
                        {
                            title: "reveal",
                            value: "reveal"
                        },
                        {
                            title: "underline reveal",
                            value: "underline-reveal"
                        },
                        {
                            title: "overline reveal",
                            value: "overline-reveal"
                        }],
                    suffix: "[-\\w]+",
                    variants: [
                        {
                            label: "Border transition",
                            prefix: "hvr-border-"
                        }]
                },
                {
                    values: [
                        {
                            title: "glow",
                            value: "glow"
                        },
                        {
                            title: "grow",
                            value: "grow"
                        },
                        {
                            title: "outset",
                            value: "outset"
                        },
                        {
                            title: "inset",
                            value: "inset"
                        },
                        {
                            title: "float",
                            value: "float"
                        },
                        {
                            title: "radial",
                            value: "radial"
                        }],
                    suffix: "[-\\w]+",
                    variants: [
                        {
                            label: "Shadow transition",
                            prefix: "hvr-shadow-"
                        }]
                }]
        },
        {
            label: "Typography",
            groups: [
                {
                    values: [
                        {
                            title: "left",
                            value: "start"
                        },
                        {
                            title: "center",
                            value: "center"
                        },
                        {
                            title: "right",
                            value: "end"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "Text Alignment",
                            prefix: "ta-"
                        }]
                },
                {
                    values: [
                        {
                            title: "theme",
                            value: "theme"
                        },
                        {
                            title: "accent",
                            value: "accent"
                        },
                        {
                            title: "primary",
                            value: "primary"
                        },
                        {
                            title: "secondary",
                            value: "secondary"
                        },
                        {
                            title: "tertiary",
                            value: "tertiary"
                        },
                        {
                            title: "success",
                            value: "success"
                        },
                        {
                            title: "info",
                            value: "info"
                        },
                        {
                            title: "warning",
                            value: "warning"
                        },
                        {
                            title: "danger",
                            value: "danger"
                        },
                        {
                            title: "light",
                            value: "light"
                        },
                        {
                            title: "dark",
                            value: "dark"
                        },
                        {
                            title: "white",
                            value: "white"
                        },
                        {
                            title: "black",
                            value: "black"
                        },
                        {
                            title: "body",
                            value: "body"
                        },
                        {
                            title: "muted",
                            value: "muted"
                        },
                        {
                            title: "reset",
                            value: "reset"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "Color",
                            prefix: "text-c-"
                        }]
                },
                {
                    values: [
                        {
                            title: "theme",
                            value: "theme"
                        },
                        {
                            title: "accent",
                            value: "accent"
                        },
                        {
                            title: "primary",
                            value: "primary"
                        },
                        {
                            title: "secondary",
                            value: "secondary"
                        },
                        {
                            title: "tertiary",
                            value: "tertiary"
                        },
                        {
                            title: "success",
                            value: "success"
                        },
                        {
                            title: "info",
                            value: "info"
                        },
                        {
                            title: "warning",
                            value: "warning"
                        },
                        {
                            title: "danger",
                            value: "danger"
                        },
                        {
                            title: "light",
                            value: "light"
                        },
                        {
                            title: "dark",
                            value: "dark"
                        },
                        {
                            title: "white",
                            value: "white"
                        },
                        {
                            title: "black",
                            value: "black"
                        },
                        {
                            title: "body",
                            value: "body"
                        },
                        {
                            title: "muted",
                            value: "muted"
                        },
                        {
                            title: "reset",
                            value: "reset"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "Color on hover",
                            prefix: "hvr-text-"
                        }]
                },
                {
                    values: [
                        {
                            title: "none",
                            value: "none"
                        },
                        {
                            title: "underline",
                            value: "underline"
                        },
                        {
                            title: "line through",
                            value: "line-through"
                        }],
                    suffix: "[-\\w]*",
                    variants: [
                        {
                            label: "Decoration",
                            prefix: "td-"
                        }]
                },
                {
                    values: [
                        {
                            title: "title",
                            value: "title"
                        },
                        {
                            title: "text",
                            value: "text"
                        },
                        {
                            title: "primary",
                            value: "primary"
                        },
                        {
                            title: "secondary",
                            value: "secondary"
                        },
                        {
                            title: "tertiary",
                            value: "tertiary"
                        },
                        {
                            title: "quaternary",
                            value: "quaternary"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "Fonts",
                            prefix: "ff-"
                        }]
                },
                {
                    values: [
                        {
                            title: "H1",
                            value: "h1"
                        },
                        {
                            title: "H2",
                            value: "h2"
                        },
                        {
                            title: "H3",
                            value: "h3"
                        },
                        {
                            title: "H4",
                            value: "h4"
                        },
                        {
                            title: "H5",
                            value: "h5"
                        },
                        {
                            title: "H6",
                            value: "h6"
                        },
                        {
                            title: "paragraph",
                            value: "p"
                        },
                        {
                            title: "x-small (12px)",
                            value: "xsmall"
                        },
                        {
                            title: "small (16px)",
                            value: "small"
                        },
                        {
                            title: "medium (20px)",
                            value: "medium"
                        },
                        {
                            title: "large (24px)",
                            value: "large"
                        },
                        {
                            title: "x-large (30px)",
                            value: "xlarge"
                        },
                        {
                            title: "xx-large (36px)",
                            value: "xxlarge"
                        },
                        {
                            title: "40px",
                            value: "40"
                        },
                        {
                            title: "45px",
                            value: "45"
                        },
                        {
                            title: "50px",
                            value: "50"
                        },
                        {
                            title: "60px",
                            value: "60"
                        },
                        {
                            title: "70px",
                            value: "70"
                        },
                        {
                            title: "80px",
                            value: "80"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "Font Size",
                            prefix: "fs-"
                        }]
                },
                {
                    values: [
                        {
                            title: "300",
                            value: "300"
                        },
                        {
                            title: "400",
                            value: "400"
                        },
                        {
                            title: "500",
                            value: "500"
                        },
                        {
                            title: "600",
                            value: "600"
                        },
                        {
                            title: "700",
                            value: "700"
                        },
                        {
                            title: "800",
                            value: "800"
                        },
                        {
                            title: "lighter",
                            value: "lighter"
                        },
                        {
                            title: "normal",
                            value: "normal"
                        },
                        {
                            title: "bold",
                            value: "bold"
                        },
                        {
                            title: "bolder",
                            value: "bolder"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "Font weight",
                            prefix: "fw-"
                        }]
                },
                {
                    values: [
                        {
                            title: "H1",
                            value: "h1"
                        },
                        {
                            title: "H2",
                            value: "h2"
                        },
                        {
                            title: "H3",
                            value: "h3"
                        },
                        {
                            title: "H4",
                            value: "h4"
                        },
                        {
                            title: "H5",
                            value: "h5"
                        },
                        {
                            title: "H6",
                            value: "h6"
                        },
                        {
                            title: "paragraph",
                            value: "p"
                        },
                        {
                            title: "xs",
                            value: "xs"
                        },
                        {
                            title: "sm",
                            value: "sm"
                        },
                        {
                            title: "md",
                            value: "md"
                        },
                        {
                            title: "lg",
                            value: "lg"
                        },
                        {
                            title: "xl",
                            value: "xl"
                        },
                        {
                            title: "xxl",
                            value: "xxl"
                        },
                        {
                            title: "40",
                            value: "40"
                        },
                        {
                            title: "45",
                            value: "45"
                        },
                        {
                            title: "50",
                            value: "50"
                        },
                        {
                            title: "60",
                            value: "60"
                        },
                        {
                            title: "70",
                            value: "70"
                        },
                        {
                            title: "80",
                            value: "80"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "Line height",
                            prefix: "lh-"
                        }]
                },
                {
                    values: [
                        {
                            title: "lowercase",
                            value: "lowercase"
                        },
                        {
                            title: "uppercase",
                            value: "uppercase"
                        },
                        {
                            title: "capitalize",
                            value: "capitalize"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "Transformation",
                            prefix: "tt-"
                        }]
                },
                {
                    values: [
                        {
                            title: "wrap",
                            value: "wrap"
                        },
                        {
                            title: "no wrap",
                            value: "nowrap"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "White space",
                            prefix: "white-space-"
                        }]
                },
                {
                    values: [
                        {
                            title: "break",
                            value: "break"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "Word Wrap",
                            prefix: "word-wrap-"
                        }]
                }]
        },
        {
            label: "Background",
            groups: [
                {
                    values: [
                        {
                            title: "transparent",
                            value: "transparent"
                        },
                        {
                            title: "theme",
                            value: "theme"
                        },
                        {
                            title: "accent",
                            value: "accent"
                        },
                        {
                            title: "primary",
                            value: "primary"
                        },
                        {
                            title: "secondary",
                            value: "secondary"
                        },
                        {
                            title: "tertiary",
                            value: "tertiary"
                        },
                        {
                            title: "success",
                            value: "success"
                        },
                        {
                            title: "info",
                            value: "info"
                        },
                        {
                            title: "warning",
                            value: "warning"
                        },
                        {
                            title: "danger",
                            value: "danger"
                        },
                        {
                            title: "light",
                            value: "light"
                        },
                        {
                            title: "dark",
                            value: "dark"
                        },
                        {
                            title: "white",
                            value: "white"
                        },
                        {
                            title: "black",
                            value: "black"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "gradient theme",
                            value: "gradient-theme"
                        },
                        {
                            title: "gradient accent",
                            value: "gradient-accent"
                        },
                        {
                            title: "gradient primary",
                            value: "gradient-primary"
                        },
                        {
                            title: "gradient secondary",
                            value: "gradient-secondary"
                        },
                        {
                            title: "gradient tertiary",
                            value: "gradient-tertiary"
                        },
                        {
                            title: "gradient success",
                            value: "gradient-success"
                        },
                        {
                            title: "gradient info",
                            value: "gradient-info"
                        },
                        {
                            title: "gradient warning",
                            value: "gradient-warning"
                        },
                        {
                            title: "gradient danger",
                            value: "gradient-danger"
                        },
                        {
                            title: "gradient light",
                            value: "gradient-light"
                        },
                        {
                            title: "gradient dark",
                            value: "gradient-dark"
                        },
                        {
                            title: "gradient white",
                            value: "gradient-white"
                        },
                        {
                            title: "gradient black",
                            value: "gradient-black"
                        }],
                    suffix: "[-\\w]*",
                    variants: [
                        {
                            label: "Color",
                            prefix: "bg-"
                        }]
                },
                {
                    values: [
                        {
                            title: "transparent",
                            value: "transparent"
                        },
                        {
                            title: "theme",
                            value: "theme"
                        },
                        {
                            title: "accent",
                            value: "accent"
                        },
                        {
                            title: "primary",
                            value: "primary"
                        },
                        {
                            title: "secondary",
                            value: "secondary"
                        },
                        {
                            title: "tertiary",
                            value: "tertiary"
                        },
                        {
                            title: "success",
                            value: "success"
                        },
                        {
                            title: "info",
                            value: "info"
                        },
                        {
                            title: "warning",
                            value: "warning"
                        },
                        {
                            title: "danger",
                            value: "danger"
                        },
                        {
                            title: "light",
                            value: "light"
                        },
                        {
                            title: "dark",
                            value: "dark"
                        },
                        {
                            title: "white",
                            value: "white"
                        },
                        {
                            title: "black",
                            value: "black"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "gradient theme",
                            value: "gradient-theme"
                        },
                        {
                            title: "gradient accent",
                            value: "gradient-accent"
                        },
                        {
                            title: "gradient primary",
                            value: "gradient-primary"
                        },
                        {
                            title: "gradient secondary",
                            value: "gradient-secondary"
                        },
                        {
                            title: "gradient tertiary",
                            value: "gradient-tertiary"
                        },
                        {
                            title: "gradient success",
                            value: "gradient-success"
                        },
                        {
                            title: "gradient info",
                            value: "gradient-info"
                        },
                        {
                            title: "gradient warning",
                            value: "gradient-warning"
                        },
                        {
                            title: "gradient danger",
                            value: "gradient-danger"
                        },
                        {
                            title: "gradient light",
                            value: "gradient-light"
                        },
                        {
                            title: "gradient dark",
                            value: "gradient-dark"
                        },
                        {
                            title: "gradient white",
                            value: "gradient-white"
                        },
                        {
                            title: "gradient black",
                            value: "gradient-black"
                        }],
                    suffix: "[-\\w]*",
                    variants: [
                        {
                            label: "Color on hover",
                            prefix: "hover-bg-"
                        }]
                }]
        },
        {
            label: "Borders",
            groups: [
                {
                    label: "Border additive",
                    values: [
                        {
                            title: "all",
                            value: "all"
                        },
                        {
                            title: "left",
                            value: "start"
                        },
                        {
                            title: "top",
                            value: "top"
                        },
                        {
                            title: "bottom",
                            value: "bottom"
                        },
                        {
                            title: "right",
                            value: "end"
                        }],
                    suffix: "[\\w]+",
                    variants: [
                        {
                            label: "all screen",
                            prefix: "b-"
                        },
                        {
                            label: "small-screen",
                            prefix: "b-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "b-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "b-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "b-xl-"
                        }],
                    multiple: true
                },
                {
                    values: [
                        {
                            title: "all",
                            value: "all"
                        },
                        {
                            title: "left",
                            value: "start"
                        },
                        {
                            title: "top",
                            value: "top"
                        },
                        {
                            title: "bottom",
                            value: "bottom"
                        },
                        {
                            title: "right",
                            value: "end"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "No Border",
                            prefix: "b-0-"
                        },
                        {
                            label: "No Border",
                            prefix: "b-0-sm-"
                        },
                        {
                            label: "No Border",
                            prefix: "b-0-md-"
                        },
                        {
                            label: "No Border",
                            prefix: "b-0-lg-"
                        },
                        {
                            label: "No Border",
                            prefix: "b-0-xl-"
                        }],
                    multiple: true
                },
                {
                    label: "Border color",
                    values: [
                        {
                            title: "theme",
                            value: "theme"
                        },
                        {
                            title: "accent",
                            value: "accent"
                        },
                        {
                            title: "primary",
                            value: "primary"
                        },
                        {
                            title: "secondary",
                            value: "secondary"
                        },
                        {
                            title: "tertiary",
                            value: "tertiary"
                        },
                        {
                            title: "success",
                            value: "success"
                        },
                        {
                            title: "info",
                            value: "info"
                        },
                        {
                            title: "warning",
                            value: "warning"
                        },
                        {
                            title: "danger",
                            value: "danger"
                        },
                        {
                            title: "light",
                            value: "light"
                        },
                        {
                            title: "dark",
                            value: "dark"
                        },
                        {
                            title: "white",
                            value: "white"
                        },
                        {
                            title: "black",
                            value: "black"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "all screen",
                            prefix: "b-c-"
                        },
                        {
                            label: "small-screen",
                            prefix: "b-c-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "b-c-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "b-c-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "b-c-xl-"
                        }]
                },
                {
                    values: [
                        {
                            title: "1",
                            value: "1"
                        },
                        {
                            title: "2",
                            value: "2"
                        },
                        {
                            title: "3",
                            value: "3"
                        },
                        {
                            title: "4",
                            value: "4"
                        },
                        {
                            title: "5",
                            value: "5"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "Border width",
                            prefix: "b-w-"
                        }]
                },
                {
                    values: [
                        {
                            title: "rounded",
                            value: ""
                        },
                        {
                            title: "rounded top",
                            value: "-top"
                        },
                        {
                            title: "rounded right",
                            value: "-end"
                        },
                        {
                            title: "rounded bottom",
                            value: "-bottom"
                        },
                        {
                            title: "rounded left",
                            value: "-start"
                        },
                        {
                            title: "circle",
                            value: "-circle"
                        },
                        {
                            title: "pill",
                            value: "-pill"
                        }],
                    suffix: "[-\\w]*",
                    variants: [
                        {
                            label: "Border radius",
                            prefix: "rounded"
                        }]
                }]
        },
        {
            label: "Margin",
            columns: "4",
            groups: [
                {
                    label: "all side",
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "1 px",
                            value: "1"
                        },
                        {
                            title: "2 px",
                            value: "2"
                        },
                        {
                            title: "3 px",
                            value: "3"
                        },
                        {
                            title: "4 px",
                            value: "4"
                        },
                        {
                            title: "5 px",
                            value: "5"
                        },
                        {
                            title: "6 px",
                            value: "6"
                        },
                        {
                            title: "7 px",
                            value: "7"
                        },
                        {
                            title: "8 px",
                            value: "8"
                        },
                        {
                            title: "9 px",
                            value: "9"
                        },
                        {
                            title: "10 px",
                            value: "10"
                        },
                        {
                            title: "15 px",
                            value: "15"
                        },
                        {
                            title: "20 px",
                            value: "20"
                        },
                        {
                            title: "25 px",
                            value: "25"
                        },
                        {
                            title: "30 px",
                            value: "30"
                        },
                        {
                            title: "35 px",
                            value: "35"
                        },
                        {
                            title: "40 px",
                            value: "40"
                        },
                        {
                            title: "45 px",
                            value: "45"
                        },
                        {
                            title: "50 px",
                            value: "50"
                        },
                        {
                            title: "60 px",
                            value: "60"
                        },
                        {
                            title: "70 px",
                            value: "70"
                        },
                        {
                            title: "80 px",
                            value: "80"
                        },
                        {
                            title: "90 px",
                            value: "90"
                        },
                        {
                            title: "100 px",
                            value: "100"
                        },
                        {
                            title: "110 px",
                            value: "110"
                        },
                        {
                            title: "120 px",
                            value: "120"
                        },
                        {
                            title: "130 px",
                            value: "130"
                        },
                        {
                            title: "140 px",
                            value: "140"
                        },
                        {
                            title: "150 px",
                            value: "150"
                        },
                        {
                            title: "160 px",
                            value: "160"
                        },
                        {
                            title: "170 px",
                            value: "170"
                        },
                        {
                            title: "180 px",
                            value: "180"
                        },
                        {
                            title: "190 px",
                            value: "190"
                        },
                        {
                            title: "200 px",
                            value: "200"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "all screen",
                            prefix: "m-"
                        },
                        {
                            label: "small-screen",
                            prefix: "m-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "m-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "m-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "m-xl-"
                        }]
                },
                {
                    label: "horizontal",
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "1 px",
                            value: "1"
                        },
                        {
                            title: "2 px",
                            value: "2"
                        },
                        {
                            title: "3 px",
                            value: "3"
                        },
                        {
                            title: "4 px",
                            value: "4"
                        },
                        {
                            title: "5 px",
                            value: "5"
                        },
                        {
                            title: "6 px",
                            value: "6"
                        },
                        {
                            title: "7 px",
                            value: "7"
                        },
                        {
                            title: "8 px",
                            value: "8"
                        },
                        {
                            title: "9 px",
                            value: "9"
                        },
                        {
                            title: "10 px",
                            value: "10"
                        },
                        {
                            title: "15 px",
                            value: "15"
                        },
                        {
                            title: "20 px",
                            value: "20"
                        },
                        {
                            title: "25 px",
                            value: "25"
                        },
                        {
                            title: "30 px",
                            value: "30"
                        },
                        {
                            title: "35 px",
                            value: "35"
                        },
                        {
                            title: "40 px",
                            value: "40"
                        },
                        {
                            title: "45 px",
                            value: "45"
                        },
                        {
                            title: "50 px",
                            value: "50"
                        },
                        {
                            title: "60 px",
                            value: "60"
                        },
                        {
                            title: "70 px",
                            value: "70"
                        },
                        {
                            title: "80 px",
                            value: "80"
                        },
                        {
                            title: "90 px",
                            value: "90"
                        },
                        {
                            title: "100 px",
                            value: "100"
                        },
                        {
                            title: "110 px",
                            value: "110"
                        },
                        {
                            title: "120 px",
                            value: "120"
                        },
                        {
                            title: "130 px",
                            value: "130"
                        },
                        {
                            title: "140 px",
                            value: "140"
                        },
                        {
                            title: "150 px",
                            value: "150"
                        },
                        {
                            title: "160 px",
                            value: "160"
                        },
                        {
                            title: "170 px",
                            value: "170"
                        },
                        {
                            title: "180 px",
                            value: "180"
                        },
                        {
                            title: "190 px",
                            value: "190"
                        },
                        {
                            title: "200 px",
                            value: "200"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "all screen",
                            prefix: "mx-"
                        },
                        {
                            label: "small-screen",
                            prefix: "mx-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "mx-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "mx-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "mx-xl-"
                        }]
                },
                {
                    label: "vertical",
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "1 px",
                            value: "1"
                        },
                        {
                            title: "2 px",
                            value: "2"
                        },
                        {
                            title: "3 px",
                            value: "3"
                        },
                        {
                            title: "4 px",
                            value: "4"
                        },
                        {
                            title: "5 px",
                            value: "5"
                        },
                        {
                            title: "6 px",
                            value: "6"
                        },
                        {
                            title: "7 px",
                            value: "7"
                        },
                        {
                            title: "8 px",
                            value: "8"
                        },
                        {
                            title: "9 px",
                            value: "9"
                        },
                        {
                            title: "10 px",
                            value: "10"
                        },
                        {
                            title: "15 px",
                            value: "15"
                        },
                        {
                            title: "20 px",
                            value: "20"
                        },
                        {
                            title: "25 px",
                            value: "25"
                        },
                        {
                            title: "30 px",
                            value: "30"
                        },
                        {
                            title: "35 px",
                            value: "35"
                        },
                        {
                            title: "40 px",
                            value: "40"
                        },
                        {
                            title: "45 px",
                            value: "45"
                        },
                        {
                            title: "50 px",
                            value: "50"
                        },
                        {
                            title: "60 px",
                            value: "60"
                        },
                        {
                            title: "70 px",
                            value: "70"
                        },
                        {
                            title: "80 px",
                            value: "80"
                        },
                        {
                            title: "90 px",
                            value: "90"
                        },
                        {
                            title: "100 px",
                            value: "100"
                        },
                        {
                            title: "110 px",
                            value: "110"
                        },
                        {
                            title: "120 px",
                            value: "120"
                        },
                        {
                            title: "130 px",
                            value: "130"
                        },
                        {
                            title: "140 px",
                            value: "140"
                        },
                        {
                            title: "150 px",
                            value: "150"
                        },
                        {
                            title: "160 px",
                            value: "160"
                        },
                        {
                            title: "170 px",
                            value: "170"
                        },
                        {
                            title: "180 px",
                            value: "180"
                        },
                        {
                            title: "190 px",
                            value: "190"
                        },
                        {
                            title: "200 px",
                            value: "200"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "all screen",
                            prefix: "my-"
                        },
                        {
                            label: "small-screen",
                            prefix: "my-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "my-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "my-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "my-xl-"
                        }]
                },
                {
                    label: "left",
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "1 px",
                            value: "1"
                        },
                        {
                            title: "2 px",
                            value: "2"
                        },
                        {
                            title: "3 px",
                            value: "3"
                        },
                        {
                            title: "4 px",
                            value: "4"
                        },
                        {
                            title: "5 px",
                            value: "5"
                        },
                        {
                            title: "6 px",
                            value: "6"
                        },
                        {
                            title: "7 px",
                            value: "7"
                        },
                        {
                            title: "8 px",
                            value: "8"
                        },
                        {
                            title: "9 px",
                            value: "9"
                        },
                        {
                            title: "10 px",
                            value: "10"
                        },
                        {
                            title: "15 px",
                            value: "15"
                        },
                        {
                            title: "20 px",
                            value: "20"
                        },
                        {
                            title: "25 px",
                            value: "25"
                        },
                        {
                            title: "30 px",
                            value: "30"
                        },
                        {
                            title: "35 px",
                            value: "35"
                        },
                        {
                            title: "40 px",
                            value: "40"
                        },
                        {
                            title: "45 px",
                            value: "45"
                        },
                        {
                            title: "50 px",
                            value: "50"
                        },
                        {
                            title: "60 px",
                            value: "60"
                        },
                        {
                            title: "70 px",
                            value: "70"
                        },
                        {
                            title: "80 px",
                            value: "80"
                        },
                        {
                            title: "90 px",
                            value: "90"
                        },
                        {
                            title: "100 px",
                            value: "100"
                        },
                        {
                            title: "110 px",
                            value: "110"
                        },
                        {
                            title: "120 px",
                            value: "120"
                        },
                        {
                            title: "130 px",
                            value: "130"
                        },
                        {
                            title: "140 px",
                            value: "140"
                        },
                        {
                            title: "150 px",
                            value: "150"
                        },
                        {
                            title: "160 px",
                            value: "160"
                        },
                        {
                            title: "170 px",
                            value: "170"
                        },
                        {
                            title: "180 px",
                            value: "180"
                        },
                        {
                            title: "190 px",
                            value: "190"
                        },
                        {
                            title: "200 px",
                            value: "200"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "all screen",
                            prefix: "ms-"
                        },
                        {
                            label: "small-screen",
                            prefix: "ms-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "ms-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "ms-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "ms-xl-"
                        }]
                },
                {
                    label: "right",
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "1 px",
                            value: "1"
                        },
                        {
                            title: "2 px",
                            value: "2"
                        },
                        {
                            title: "3 px",
                            value: "3"
                        },
                        {
                            title: "4 px",
                            value: "4"
                        },
                        {
                            title: "5 px",
                            value: "5"
                        },
                        {
                            title: "6 px",
                            value: "6"
                        },
                        {
                            title: "7 px",
                            value: "7"
                        },
                        {
                            title: "8 px",
                            value: "8"
                        },
                        {
                            title: "9 px",
                            value: "9"
                        },
                        {
                            title: "10 px",
                            value: "10"
                        },
                        {
                            title: "15 px",
                            value: "15"
                        },
                        {
                            title: "20 px",
                            value: "20"
                        },
                        {
                            title: "25 px",
                            value: "25"
                        },
                        {
                            title: "30 px",
                            value: "30"
                        },
                        {
                            title: "35 px",
                            value: "35"
                        },
                        {
                            title: "40 px",
                            value: "40"
                        },
                        {
                            title: "45 px",
                            value: "45"
                        },
                        {
                            title: "50 px",
                            value: "50"
                        },
                        {
                            title: "60 px",
                            value: "60"
                        },
                        {
                            title: "70 px",
                            value: "70"
                        },
                        {
                            title: "80 px",
                            value: "80"
                        },
                        {
                            title: "90 px",
                            value: "90"
                        },
                        {
                            title: "100 px",
                            value: "100"
                        },
                        {
                            title: "110 px",
                            value: "110"
                        },
                        {
                            title: "120 px",
                            value: "120"
                        },
                        {
                            title: "130 px",
                            value: "130"
                        },
                        {
                            title: "140 px",
                            value: "140"
                        },
                        {
                            title: "150 px",
                            value: "150"
                        },
                        {
                            title: "160 px",
                            value: "160"
                        },
                        {
                            title: "170 px",
                            value: "170"
                        },
                        {
                            title: "180 px",
                            value: "180"
                        },
                        {
                            title: "190 px",
                            value: "190"
                        },
                        {
                            title: "200 px",
                            value: "200"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "all screen",
                            prefix: "me-"
                        },
                        {
                            label: "small-screen",
                            prefix: "me-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "me-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "me-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "me-xl-"
                        }]
                },
                {
                    label: "top",
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "1 px",
                            value: "1"
                        },
                        {
                            title: "2 px",
                            value: "2"
                        },
                        {
                            title: "3 px",
                            value: "3"
                        },
                        {
                            title: "4 px",
                            value: "4"
                        },
                        {
                            title: "5 px",
                            value: "5"
                        },
                        {
                            title: "6 px",
                            value: "6"
                        },
                        {
                            title: "7 px",
                            value: "7"
                        },
                        {
                            title: "8 px",
                            value: "8"
                        },
                        {
                            title: "9 px",
                            value: "9"
                        },
                        {
                            title: "10 px",
                            value: "10"
                        },
                        {
                            title: "15 px",
                            value: "15"
                        },
                        {
                            title: "20 px",
                            value: "20"
                        },
                        {
                            title: "25 px",
                            value: "25"
                        },
                        {
                            title: "30 px",
                            value: "30"
                        },
                        {
                            title: "35 px",
                            value: "35"
                        },
                        {
                            title: "40 px",
                            value: "40"
                        },
                        {
                            title: "45 px",
                            value: "45"
                        },
                        {
                            title: "50 px",
                            value: "50"
                        },
                        {
                            title: "60 px",
                            value: "60"
                        },
                        {
                            title: "70 px",
                            value: "70"
                        },
                        {
                            title: "80 px",
                            value: "80"
                        },
                        {
                            title: "90 px",
                            value: "90"
                        },
                        {
                            title: "100 px",
                            value: "100"
                        },
                        {
                            title: "110 px",
                            value: "110"
                        },
                        {
                            title: "120 px",
                            value: "120"
                        },
                        {
                            title: "130 px",
                            value: "130"
                        },
                        {
                            title: "140 px",
                            value: "140"
                        },
                        {
                            title: "150 px",
                            value: "150"
                        },
                        {
                            title: "160 px",
                            value: "160"
                        },
                        {
                            title: "170 px",
                            value: "170"
                        },
                        {
                            title: "180 px",
                            value: "180"
                        },
                        {
                            title: "190 px",
                            value: "190"
                        },
                        {
                            title: "200 px",
                            value: "200"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "all screen",
                            prefix: "mt-"
                        },
                        {
                            label: "small-screen",
                            prefix: "mt-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "mt-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "mt-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "mt-xl-"
                        }]
                },
                {
                    label: "bottom",
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "1 px",
                            value: "1"
                        },
                        {
                            title: "2 px",
                            value: "2"
                        },
                        {
                            title: "3 px",
                            value: "3"
                        },
                        {
                            title: "4 px",
                            value: "4"
                        },
                        {
                            title: "5 px",
                            value: "5"
                        },
                        {
                            title: "6 px",
                            value: "6"
                        },
                        {
                            title: "7 px",
                            value: "7"
                        },
                        {
                            title: "8 px",
                            value: "8"
                        },
                        {
                            title: "9 px",
                            value: "9"
                        },
                        {
                            title: "10 px",
                            value: "10"
                        },
                        {
                            title: "15 px",
                            value: "15"
                        },
                        {
                            title: "20 px",
                            value: "20"
                        },
                        {
                            title: "25 px",
                            value: "25"
                        },
                        {
                            title: "30 px",
                            value: "30"
                        },
                        {
                            title: "35 px",
                            value: "35"
                        },
                        {
                            title: "40 px",
                            value: "40"
                        },
                        {
                            title: "45 px",
                            value: "45"
                        },
                        {
                            title: "50 px",
                            value: "50"
                        },
                        {
                            title: "60 px",
                            value: "60"
                        },
                        {
                            title: "70 px",
                            value: "70"
                        },
                        {
                            title: "80 px",
                            value: "80"
                        },
                        {
                            title: "90 px",
                            value: "90"
                        },
                        {
                            title: "100 px",
                            value: "100"
                        },
                        {
                            title: "110 px",
                            value: "110"
                        },
                        {
                            title: "120 px",
                            value: "120"
                        },
                        {
                            title: "130 px",
                            value: "130"
                        },
                        {
                            title: "140 px",
                            value: "140"
                        },
                        {
                            title: "150 px",
                            value: "150"
                        },
                        {
                            title: "160 px",
                            value: "160"
                        },
                        {
                            title: "170 px",
                            value: "170"
                        },
                        {
                            title: "180 px",
                            value: "180"
                        },
                        {
                            title: "190 px",
                            value: "190"
                        },
                        {
                            title: "200 px",
                            value: "200"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "all screen",
                            prefix: "mb-"
                        },
                        {
                            label: "small-screen",
                            prefix: "mb-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "mb-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "mb-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "mb-xl-"
                        }]
                }]
        },
        {
            label: "Negative Margin",
            groups: [
                {
                    label: "left",
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "1 px",
                            value: "1"
                        },
                        {
                            title: "2 px",
                            value: "2"
                        },
                        {
                            title: "3 px",
                            value: "3"
                        },
                        {
                            title: "4 px",
                            value: "4"
                        },
                        {
                            title: "5 px",
                            value: "5"
                        },
                        {
                            title: "6 px",
                            value: "6"
                        },
                        {
                            title: "7 px",
                            value: "7"
                        },
                        {
                            title: "8 px",
                            value: "8"
                        },
                        {
                            title: "9 px",
                            value: "9"
                        },
                        {
                            title: "10 px",
                            value: "10"
                        },
                        {
                            title: "15 px",
                            value: "15"
                        },
                        {
                            title: "20 px",
                            value: "20"
                        },
                        {
                            title: "25 px",
                            value: "25"
                        },
                        {
                            title: "30 px",
                            value: "30"
                        },
                        {
                            title: "35 px",
                            value: "35"
                        },
                        {
                            title: "40 px",
                            value: "40"
                        },
                        {
                            title: "45 px",
                            value: "45"
                        },
                        {
                            title: "50 px",
                            value: "50"
                        },
                        {
                            title: "60 px",
                            value: "60"
                        },
                        {
                            title: "70 px",
                            value: "70"
                        },
                        {
                            title: "80 px",
                            value: "80"
                        },
                        {
                            title: "90 px",
                            value: "90"
                        },
                        {
                            title: "100 px",
                            value: "100"
                        },
                        {
                            title: "110 px",
                            value: "110"
                        },
                        {
                            title: "120 px",
                            value: "120"
                        },
                        {
                            title: "130 px",
                            value: "130"
                        },
                        {
                            title: "140 px",
                            value: "140"
                        },
                        {
                            title: "150 px",
                            value: "150"
                        },
                        {
                            title: "160 px",
                            value: "160"
                        },
                        {
                            title: "170 px",
                            value: "170"
                        },
                        {
                            title: "180 px",
                            value: "180"
                        },
                        {
                            title: "190 px",
                            value: "190"
                        },
                        {
                            title: "200 px",
                            value: "200"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "all screen",
                            prefix: "ms-n-"
                        },
                        {
                            label: "small-screen",
                            prefix: "ms-n-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "ms-n-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "ms-n-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "ms-n-xl-"
                        }]
                },
                {
                    label: "right",
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "1 px",
                            value: "1"
                        },
                        {
                            title: "2 px",
                            value: "2"
                        },
                        {
                            title: "3 px",
                            value: "3"
                        },
                        {
                            title: "4 px",
                            value: "4"
                        },
                        {
                            title: "5 px",
                            value: "5"
                        },
                        {
                            title: "6 px",
                            value: "6"
                        },
                        {
                            title: "7 px",
                            value: "7"
                        },
                        {
                            title: "8 px",
                            value: "8"
                        },
                        {
                            title: "9 px",
                            value: "9"
                        },
                        {
                            title: "10 px",
                            value: "10"
                        },
                        {
                            title: "15 px",
                            value: "15"
                        },
                        {
                            title: "20 px",
                            value: "20"
                        },
                        {
                            title: "25 px",
                            value: "25"
                        },
                        {
                            title: "30 px",
                            value: "30"
                        },
                        {
                            title: "35 px",
                            value: "35"
                        },
                        {
                            title: "40 px",
                            value: "40"
                        },
                        {
                            title: "45 px",
                            value: "45"
                        },
                        {
                            title: "50 px",
                            value: "50"
                        },
                        {
                            title: "60 px",
                            value: "60"
                        },
                        {
                            title: "70 px",
                            value: "70"
                        },
                        {
                            title: "80 px",
                            value: "80"
                        },
                        {
                            title: "90 px",
                            value: "90"
                        },
                        {
                            title: "100 px",
                            value: "100"
                        },
                        {
                            title: "110 px",
                            value: "110"
                        },
                        {
                            title: "120 px",
                            value: "120"
                        },
                        {
                            title: "130 px",
                            value: "130"
                        },
                        {
                            title: "140 px",
                            value: "140"
                        },
                        {
                            title: "150 px",
                            value: "150"
                        },
                        {
                            title: "160 px",
                            value: "160"
                        },
                        {
                            title: "170 px",
                            value: "170"
                        },
                        {
                            title: "180 px",
                            value: "180"
                        },
                        {
                            title: "190 px",
                            value: "190"
                        },
                        {
                            title: "200 px",
                            value: "200"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "all screen",
                            prefix: "me-n-"
                        },
                        {
                            label: "small-screen",
                            prefix: "me-n-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "me-n-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "me-n-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "me-n-xl-"
                        }]
                },
                {
                    label: "top",
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "1 px",
                            value: "1"
                        },
                        {
                            title: "2 px",
                            value: "2"
                        },
                        {
                            title: "3 px",
                            value: "3"
                        },
                        {
                            title: "4 px",
                            value: "4"
                        },
                        {
                            title: "5 px",
                            value: "5"
                        },
                        {
                            title: "6 px",
                            value: "6"
                        },
                        {
                            title: "7 px",
                            value: "7"
                        },
                        {
                            title: "8 px",
                            value: "8"
                        },
                        {
                            title: "9 px",
                            value: "9"
                        },
                        {
                            title: "10 px",
                            value: "10"
                        },
                        {
                            title: "15 px",
                            value: "15"
                        },
                        {
                            title: "20 px",
                            value: "20"
                        },
                        {
                            title: "25 px",
                            value: "25"
                        },
                        {
                            title: "30 px",
                            value: "30"
                        },
                        {
                            title: "35 px",
                            value: "35"
                        },
                        {
                            title: "40 px",
                            value: "40"
                        },
                        {
                            title: "45 px",
                            value: "45"
                        },
                        {
                            title: "50 px",
                            value: "50"
                        },
                        {
                            title: "60 px",
                            value: "60"
                        },
                        {
                            title: "70 px",
                            value: "70"
                        },
                        {
                            title: "80 px",
                            value: "80"
                        },
                        {
                            title: "90 px",
                            value: "90"
                        },
                        {
                            title: "100 px",
                            value: "100"
                        },
                        {
                            title: "110 px",
                            value: "110"
                        },
                        {
                            title: "120 px",
                            value: "120"
                        },
                        {
                            title: "130 px",
                            value: "130"
                        },
                        {
                            title: "140 px",
                            value: "140"
                        },
                        {
                            title: "150 px",
                            value: "150"
                        },
                        {
                            title: "160 px",
                            value: "160"
                        },
                        {
                            title: "170 px",
                            value: "170"
                        },
                        {
                            title: "180 px",
                            value: "180"
                        },
                        {
                            title: "190 px",
                            value: "190"
                        },
                        {
                            title: "200 px",
                            value: "200"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "all screen",
                            prefix: "mt-n-"
                        },
                        {
                            label: "small-screen",
                            prefix: "mt-n-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "mt-n-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "mt-n-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "mt-n-xl-"
                        }]
                },
                {
                    label: "bottom",
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "1 px",
                            value: "1"
                        },
                        {
                            title: "2 px",
                            value: "2"
                        },
                        {
                            title: "3 px",
                            value: "3"
                        },
                        {
                            title: "4 px",
                            value: "4"
                        },
                        {
                            title: "5 px",
                            value: "5"
                        },
                        {
                            title: "6 px",
                            value: "6"
                        },
                        {
                            title: "7 px",
                            value: "7"
                        },
                        {
                            title: "8 px",
                            value: "8"
                        },
                        {
                            title: "9 px",
                            value: "9"
                        },
                        {
                            title: "10 px",
                            value: "10"
                        },
                        {
                            title: "15 px",
                            value: "15"
                        },
                        {
                            title: "20 px",
                            value: "20"
                        },
                        {
                            title: "25 px",
                            value: "25"
                        },
                        {
                            title: "30 px",
                            value: "30"
                        },
                        {
                            title: "35 px",
                            value: "35"
                        },
                        {
                            title: "40 px",
                            value: "40"
                        },
                        {
                            title: "45 px",
                            value: "45"
                        },
                        {
                            title: "50 px",
                            value: "50"
                        },
                        {
                            title: "60 px",
                            value: "60"
                        },
                        {
                            title: "70 px",
                            value: "70"
                        },
                        {
                            title: "80 px",
                            value: "80"
                        },
                        {
                            title: "90 px",
                            value: "90"
                        },
                        {
                            title: "100 px",
                            value: "100"
                        },
                        {
                            title: "110 px",
                            value: "110"
                        },
                        {
                            title: "120 px",
                            value: "120"
                        },
                        {
                            title: "130 px",
                            value: "130"
                        },
                        {
                            title: "140 px",
                            value: "140"
                        },
                        {
                            title: "150 px",
                            value: "150"
                        },
                        {
                            title: "160 px",
                            value: "160"
                        },
                        {
                            title: "170 px",
                            value: "170"
                        },
                        {
                            title: "180 px",
                            value: "180"
                        },
                        {
                            title: "190 px",
                            value: "190"
                        },
                        {
                            title: "200 px",
                            value: "200"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "all screen",
                            prefix: "mb-n-"
                        },
                        {
                            label: "small-screen",
                            prefix: "mb-n-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "mb-n-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "mb-n-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "mb-n-xl-"
                        }]
                }]
        },
        {
            label: "Padding",
            groups: [
                {
                    label: "all side",
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "1 px",
                            value: "1"
                        },
                        {
                            title: "2 px",
                            value: "2"
                        },
                        {
                            title: "3 px",
                            value: "3"
                        },
                        {
                            title: "4 px",
                            value: "4"
                        },
                        {
                            title: "5 px",
                            value: "5"
                        },
                        {
                            title: "6 px",
                            value: "6"
                        },
                        {
                            title: "7 px",
                            value: "7"
                        },
                        {
                            title: "8 px",
                            value: "8"
                        },
                        {
                            title: "9 px",
                            value: "9"
                        },
                        {
                            title: "10 px",
                            value: "10"
                        },
                        {
                            title: "15 px",
                            value: "15"
                        },
                        {
                            title: "20 px",
                            value: "20"
                        },
                        {
                            title: "25 px",
                            value: "25"
                        },
                        {
                            title: "30 px",
                            value: "30"
                        },
                        {
                            title: "35 px",
                            value: "35"
                        },
                        {
                            title: "40 px",
                            value: "40"
                        },
                        {
                            title: "45 px",
                            value: "45"
                        },
                        {
                            title: "50 px",
                            value: "50"
                        },
                        {
                            title: "60 px",
                            value: "60"
                        },
                        {
                            title: "70 px",
                            value: "70"
                        },
                        {
                            title: "80 px",
                            value: "80"
                        },
                        {
                            title: "90 px",
                            value: "90"
                        },
                        {
                            title: "100 px",
                            value: "100"
                        },
                        {
                            title: "110 px",
                            value: "110"
                        },
                        {
                            title: "120 px",
                            value: "120"
                        },
                        {
                            title: "130 px",
                            value: "130"
                        },
                        {
                            title: "140 px",
                            value: "140"
                        },
                        {
                            title: "150 px",
                            value: "150"
                        },
                        {
                            title: "160 px",
                            value: "160"
                        },
                        {
                            title: "170 px",
                            value: "170"
                        },
                        {
                            title: "180 px",
                            value: "180"
                        },
                        {
                            title: "190 px",
                            value: "190"
                        },
                        {
                            title: "200 px",
                            value: "200"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "all screen",
                            prefix: "p-"
                        },
                        {
                            label: "small-screen",
                            prefix: "p-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "p-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "p-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "p-xl-"
                        }]
                },
                {
                    label: "horizontal",
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "1 px",
                            value: "1"
                        },
                        {
                            title: "2 px",
                            value: "2"
                        },
                        {
                            title: "3 px",
                            value: "3"
                        },
                        {
                            title: "4 px",
                            value: "4"
                        },
                        {
                            title: "5 px",
                            value: "5"
                        },
                        {
                            title: "6 px",
                            value: "6"
                        },
                        {
                            title: "7 px",
                            value: "7"
                        },
                        {
                            title: "8 px",
                            value: "8"
                        },
                        {
                            title: "9 px",
                            value: "9"
                        },
                        {
                            title: "10 px",
                            value: "10"
                        },
                        {
                            title: "15 px",
                            value: "15"
                        },
                        {
                            title: "20 px",
                            value: "20"
                        },
                        {
                            title: "25 px",
                            value: "25"
                        },
                        {
                            title: "30 px",
                            value: "30"
                        },
                        {
                            title: "35 px",
                            value: "35"
                        },
                        {
                            title: "40 px",
                            value: "40"
                        },
                        {
                            title: "45 px",
                            value: "45"
                        },
                        {
                            title: "50 px",
                            value: "50"
                        },
                        {
                            title: "60 px",
                            value: "60"
                        },
                        {
                            title: "70 px",
                            value: "70"
                        },
                        {
                            title: "80 px",
                            value: "80"
                        },
                        {
                            title: "90 px",
                            value: "90"
                        },
                        {
                            title: "100 px",
                            value: "100"
                        },
                        {
                            title: "110 px",
                            value: "110"
                        },
                        {
                            title: "120 px",
                            value: "120"
                        },
                        {
                            title: "130 px",
                            value: "130"
                        },
                        {
                            title: "140 px",
                            value: "140"
                        },
                        {
                            title: "150 px",
                            value: "150"
                        },
                        {
                            title: "160 px",
                            value: "160"
                        },
                        {
                            title: "170 px",
                            value: "170"
                        },
                        {
                            title: "180 px",
                            value: "180"
                        },
                        {
                            title: "190 px",
                            value: "190"
                        },
                        {
                            title: "200 px",
                            value: "200"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "all screen",
                            prefix: "px-"
                        },
                        {
                            label: "small-screen",
                            prefix: "px-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "px-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "px-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "px-xl-"
                        }]
                },
                {
                    label: "vertical",
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "1 px",
                            value: "1"
                        },
                        {
                            title: "2 px",
                            value: "2"
                        },
                        {
                            title: "3 px",
                            value: "3"
                        },
                        {
                            title: "4 px",
                            value: "4"
                        },
                        {
                            title: "5 px",
                            value: "5"
                        },
                        {
                            title: "6 px",
                            value: "6"
                        },
                        {
                            title: "7 px",
                            value: "7"
                        },
                        {
                            title: "8 px",
                            value: "8"
                        },
                        {
                            title: "9 px",
                            value: "9"
                        },
                        {
                            title: "10 px",
                            value: "10"
                        },
                        {
                            title: "15 px",
                            value: "15"
                        },
                        {
                            title: "20 px",
                            value: "20"
                        },
                        {
                            title: "25 px",
                            value: "25"
                        },
                        {
                            title: "30 px",
                            value: "30"
                        },
                        {
                            title: "35 px",
                            value: "35"
                        },
                        {
                            title: "40 px",
                            value: "40"
                        },
                        {
                            title: "45 px",
                            value: "45"
                        },
                        {
                            title: "50 px",
                            value: "50"
                        },
                        {
                            title: "60 px",
                            value: "60"
                        },
                        {
                            title: "70 px",
                            value: "70"
                        },
                        {
                            title: "80 px",
                            value: "80"
                        },
                        {
                            title: "90 px",
                            value: "90"
                        },
                        {
                            title: "100 px",
                            value: "100"
                        },
                        {
                            title: "110 px",
                            value: "110"
                        },
                        {
                            title: "120 px",
                            value: "120"
                        },
                        {
                            title: "130 px",
                            value: "130"
                        },
                        {
                            title: "140 px",
                            value: "140"
                        },
                        {
                            title: "150 px",
                            value: "150"
                        },
                        {
                            title: "160 px",
                            value: "160"
                        },
                        {
                            title: "170 px",
                            value: "170"
                        },
                        {
                            title: "180 px",
                            value: "180"
                        },
                        {
                            title: "190 px",
                            value: "190"
                        },
                        {
                            title: "200 px",
                            value: "200"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "all screen",
                            prefix: "py-"
                        },
                        {
                            label: "small-screen",
                            prefix: "py-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "py-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "py-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "py-xl-"
                        }]
                },
                {
                    label: "left",
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "1 px",
                            value: "1"
                        },
                        {
                            title: "2 px",
                            value: "2"
                        },
                        {
                            title: "3 px",
                            value: "3"
                        },
                        {
                            title: "4 px",
                            value: "4"
                        },
                        {
                            title: "5 px",
                            value: "5"
                        },
                        {
                            title: "6 px",
                            value: "6"
                        },
                        {
                            title: "7 px",
                            value: "7"
                        },
                        {
                            title: "8 px",
                            value: "8"
                        },
                        {
                            title: "9 px",
                            value: "9"
                        },
                        {
                            title: "10 px",
                            value: "10"
                        },
                        {
                            title: "15 px",
                            value: "15"
                        },
                        {
                            title: "20 px",
                            value: "20"
                        },
                        {
                            title: "25 px",
                            value: "25"
                        },
                        {
                            title: "30 px",
                            value: "30"
                        },
                        {
                            title: "35 px",
                            value: "35"
                        },
                        {
                            title: "40 px",
                            value: "40"
                        },
                        {
                            title: "45 px",
                            value: "45"
                        },
                        {
                            title: "50 px",
                            value: "50"
                        },
                        {
                            title: "60 px",
                            value: "60"
                        },
                        {
                            title: "70 px",
                            value: "70"
                        },
                        {
                            title: "80 px",
                            value: "80"
                        },
                        {
                            title: "90 px",
                            value: "90"
                        },
                        {
                            title: "100 px",
                            value: "100"
                        },
                        {
                            title: "110 px",
                            value: "110"
                        },
                        {
                            title: "120 px",
                            value: "120"
                        },
                        {
                            title: "130 px",
                            value: "130"
                        },
                        {
                            title: "140 px",
                            value: "140"
                        },
                        {
                            title: "150 px",
                            value: "150"
                        },
                        {
                            title: "160 px",
                            value: "160"
                        },
                        {
                            title: "170 px",
                            value: "170"
                        },
                        {
                            title: "180 px",
                            value: "180"
                        },
                        {
                            title: "190 px",
                            value: "190"
                        },
                        {
                            title: "200 px",
                            value: "200"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "all screen",
                            prefix: "ps-"
                        },
                        {
                            label: "small-screen",
                            prefix: "ps-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "ps-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "ps-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "ps-xl-"
                        }]
                },
                {
                    label: "right",
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "1 px",
                            value: "1"
                        },
                        {
                            title: "2 px",
                            value: "2"
                        },
                        {
                            title: "3 px",
                            value: "3"
                        },
                        {
                            title: "4 px",
                            value: "4"
                        },
                        {
                            title: "5 px",
                            value: "5"
                        },
                        {
                            title: "6 px",
                            value: "6"
                        },
                        {
                            title: "7 px",
                            value: "7"
                        },
                        {
                            title: "8 px",
                            value: "8"
                        },
                        {
                            title: "9 px",
                            value: "9"
                        },
                        {
                            title: "10 px",
                            value: "10"
                        },
                        {
                            title: "15 px",
                            value: "15"
                        },
                        {
                            title: "20 px",
                            value: "20"
                        },
                        {
                            title: "25 px",
                            value: "25"
                        },
                        {
                            title: "30 px",
                            value: "30"
                        },
                        {
                            title: "35 px",
                            value: "35"
                        },
                        {
                            title: "40 px",
                            value: "40"
                        },
                        {
                            title: "45 px",
                            value: "45"
                        },
                        {
                            title: "50 px",
                            value: "50"
                        },
                        {
                            title: "60 px",
                            value: "60"
                        },
                        {
                            title: "70 px",
                            value: "70"
                        },
                        {
                            title: "80 px",
                            value: "80"
                        },
                        {
                            title: "90 px",
                            value: "90"
                        },
                        {
                            title: "100 px",
                            value: "100"
                        },
                        {
                            title: "110 px",
                            value: "110"
                        },
                        {
                            title: "120 px",
                            value: "120"
                        },
                        {
                            title: "130 px",
                            value: "130"
                        },
                        {
                            title: "140 px",
                            value: "140"
                        },
                        {
                            title: "150 px",
                            value: "150"
                        },
                        {
                            title: "160 px",
                            value: "160"
                        },
                        {
                            title: "170 px",
                            value: "170"
                        },
                        {
                            title: "180 px",
                            value: "180"
                        },
                        {
                            title: "190 px",
                            value: "190"
                        },
                        {
                            title: "200 px",
                            value: "200"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "all screen",
                            prefix: "pe-"
                        },
                        {
                            label: "small-screen",
                            prefix: "pe-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "pe-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "pe-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "pe-xl-"
                        }]
                },
                {
                    label: "top",
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "1 px",
                            value: "1"
                        },
                        {
                            title: "2 px",
                            value: "2"
                        },
                        {
                            title: "3 px",
                            value: "3"
                        },
                        {
                            title: "4 px",
                            value: "4"
                        },
                        {
                            title: "5 px",
                            value: "5"
                        },
                        {
                            title: "6 px",
                            value: "6"
                        },
                        {
                            title: "7 px",
                            value: "7"
                        },
                        {
                            title: "8 px",
                            value: "8"
                        },
                        {
                            title: "9 px",
                            value: "9"
                        },
                        {
                            title: "10 px",
                            value: "10"
                        },
                        {
                            title: "15 px",
                            value: "15"
                        },
                        {
                            title: "20 px",
                            value: "20"
                        },
                        {
                            title: "25 px",
                            value: "25"
                        },
                        {
                            title: "30 px",
                            value: "30"
                        },
                        {
                            title: "35 px",
                            value: "35"
                        },
                        {
                            title: "40 px",
                            value: "40"
                        },
                        {
                            title: "45 px",
                            value: "45"
                        },
                        {
                            title: "50 px",
                            value: "50"
                        },
                        {
                            title: "60 px",
                            value: "60"
                        },
                        {
                            title: "70 px",
                            value: "70"
                        },
                        {
                            title: "80 px",
                            value: "80"
                        },
                        {
                            title: "90 px",
                            value: "90"
                        },
                        {
                            title: "100 px",
                            value: "100"
                        },
                        {
                            title: "110 px",
                            value: "110"
                        },
                        {
                            title: "120 px",
                            value: "120"
                        },
                        {
                            title: "130 px",
                            value: "130"
                        },
                        {
                            title: "140 px",
                            value: "140"
                        },
                        {
                            title: "150 px",
                            value: "150"
                        },
                        {
                            title: "160 px",
                            value: "160"
                        },
                        {
                            title: "170 px",
                            value: "170"
                        },
                        {
                            title: "180 px",
                            value: "180"
                        },
                        {
                            title: "190 px",
                            value: "190"
                        },
                        {
                            title: "200 px",
                            value: "200"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "all screen",
                            prefix: "pt-"
                        },
                        {
                            label: "small-screen",
                            prefix: "pt-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "pt-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "pt-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "pt-xl-"
                        }]
                },
                {
                    label: "bottom",
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "1 px",
                            value: "1"
                        },
                        {
                            title: "2 px",
                            value: "2"
                        },
                        {
                            title: "3 px",
                            value: "3"
                        },
                        {
                            title: "4 px",
                            value: "4"
                        },
                        {
                            title: "5 px",
                            value: "5"
                        },
                        {
                            title: "6 px",
                            value: "6"
                        },
                        {
                            title: "7 px",
                            value: "7"
                        },
                        {
                            title: "8 px",
                            value: "8"
                        },
                        {
                            title: "9 px",
                            value: "9"
                        },
                        {
                            title: "10 px",
                            value: "10"
                        },
                        {
                            title: "15 px",
                            value: "15"
                        },
                        {
                            title: "20 px",
                            value: "20"
                        },
                        {
                            title: "25 px",
                            value: "25"
                        },
                        {
                            title: "30 px",
                            value: "30"
                        },
                        {
                            title: "35 px",
                            value: "35"
                        },
                        {
                            title: "40 px",
                            value: "40"
                        },
                        {
                            title: "45 px",
                            value: "45"
                        },
                        {
                            title: "50 px",
                            value: "50"
                        },
                        {
                            title: "60 px",
                            value: "60"
                        },
                        {
                            title: "70 px",
                            value: "70"
                        },
                        {
                            title: "80 px",
                            value: "80"
                        },
                        {
                            title: "90 px",
                            value: "90"
                        },
                        {
                            title: "100 px",
                            value: "100"
                        },
                        {
                            title: "110 px",
                            value: "110"
                        },
                        {
                            title: "120 px",
                            value: "120"
                        },
                        {
                            title: "130 px",
                            value: "130"
                        },
                        {
                            title: "140 px",
                            value: "140"
                        },
                        {
                            title: "150 px",
                            value: "150"
                        },
                        {
                            title: "160 px",
                            value: "160"
                        },
                        {
                            title: "170 px",
                            value: "170"
                        },
                        {
                            title: "180 px",
                            value: "180"
                        },
                        {
                            title: "190 px",
                            value: "190"
                        },
                        {
                            title: "200 px",
                            value: "200"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "all screen",
                            prefix: "pb-"
                        },
                        {
                            label: "small-screen",
                            prefix: "pb-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "pb-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "pb-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "pb-xl-"
                        }]
                }]
        },
        {
            label: "Width & Height",
            groups: [
                {
                    label: "Width",
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "25%",
                            value: "p25"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "75%",
                            value: "p75"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "5 px",
                            value: "5"
                        },
                        {
                            title: "10 px",
                            value: "10"
                        },
                        {
                            title: "15 px",
                            value: "15"
                        },
                        {
                            title: "20 px",
                            value: "20"
                        },
                        {
                            title: "25 px",
                            value: "25"
                        },
                        {
                            title: "30 px",
                            value: "30"
                        },
                        {
                            title: "35 px",
                            value: "35"
                        },
                        {
                            title: "40 px",
                            value: "40"
                        },
                        {
                            title: "45 px",
                            value: "45"
                        },
                        {
                            title: "50 px",
                            value: "50"
                        },
                        {
                            title: "55 px",
                            value: "55"
                        },
                        {
                            title: "60 px",
                            value: "60"
                        },
                        {
                            title: "65 px",
                            value: "65"
                        },
                        {
                            title: "70 px",
                            value: "70"
                        },
                        {
                            title: "75 px",
                            value: "75"
                        },
                        {
                            title: "80 px",
                            value: "80"
                        },
                        {
                            title: "85 px",
                            value: "85"
                        },
                        {
                            title: "90 px",
                            value: "90"
                        },
                        {
                            title: "95 px",
                            value: "95"
                        },
                        {
                            title: "100 px",
                            value: "100"
                        },
                        {
                            title: "120 px",
                            value: "120"
                        },
                        {
                            title: "140 px",
                            value: "140"
                        },
                        {
                            title: "160 px",
                            value: "160"
                        },
                        {
                            title: "180 px",
                            value: "180"
                        },
                        {
                            title: "200 px",
                            value: "200"
                        },
                        {
                            title: "220 px",
                            value: "220"
                        },
                        {
                            title: "240 px",
                            value: "240"
                        },
                        {
                            title: "260 px",
                            value: "260"
                        },
                        {
                            title: "280 px",
                            value: "280"
                        },
                        {
                            title: "300 px",
                            value: "300"
                        },
                        {
                            title: "350 px",
                            value: "350"
                        },
                        {
                            title: "400 px",
                            value: "400"
                        },
                        {
                            title: "450 px",
                            value: "450"
                        },
                        {
                            title: "500 px",
                            value: "500"
                        },
                        {
                            title: "550 px",
                            value: "550"
                        },
                        {
                            title: "600 px",
                            value: "600"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "25% viewport",
                            value: "v25"
                        },
                        {
                            title: "50% viewport",
                            value: "v50"
                        },
                        {
                            title: "75% viewport",
                            value: "v75"
                        },
                        {
                            title: "100% viewport",
                            value: "v100"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "all screen",
                            prefix: "w-"
                        },
                        {
                            label: "small-screen",
                            prefix: "w-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "w-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "w-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "w-xl-"
                        }]
                },
                {
                    label: "Min Width",
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "25%",
                            value: "p25"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "75%",
                            value: "p75"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "5 px",
                            value: "5"
                        },
                        {
                            title: "10 px",
                            value: "10"
                        },
                        {
                            title: "15 px",
                            value: "15"
                        },
                        {
                            title: "20 px",
                            value: "20"
                        },
                        {
                            title: "25 px",
                            value: "25"
                        },
                        {
                            title: "30 px",
                            value: "30"
                        },
                        {
                            title: "35 px",
                            value: "35"
                        },
                        {
                            title: "40 px",
                            value: "40"
                        },
                        {
                            title: "45 px",
                            value: "45"
                        },
                        {
                            title: "50 px",
                            value: "50"
                        },
                        {
                            title: "55 px",
                            value: "55"
                        },
                        {
                            title: "60 px",
                            value: "60"
                        },
                        {
                            title: "65 px",
                            value: "65"
                        },
                        {
                            title: "70 px",
                            value: "70"
                        },
                        {
                            title: "75 px",
                            value: "75"
                        },
                        {
                            title: "80 px",
                            value: "80"
                        },
                        {
                            title: "85 px",
                            value: "85"
                        },
                        {
                            title: "90 px",
                            value: "90"
                        },
                        {
                            title: "95 px",
                            value: "95"
                        },
                        {
                            title: "100 px",
                            value: "100"
                        },
                        {
                            title: "120 px",
                            value: "120"
                        },
                        {
                            title: "140 px",
                            value: "140"
                        },
                        {
                            title: "160 px",
                            value: "160"
                        },
                        {
                            title: "180 px",
                            value: "180"
                        },
                        {
                            title: "200 px",
                            value: "200"
                        },
                        {
                            title: "220 px",
                            value: "220"
                        },
                        {
                            title: "240 px",
                            value: "240"
                        },
                        {
                            title: "260 px",
                            value: "260"
                        },
                        {
                            title: "280 px",
                            value: "280"
                        },
                        {
                            title: "300 px",
                            value: "300"
                        },
                        {
                            title: "350 px",
                            value: "350"
                        },
                        {
                            title: "400 px",
                            value: "400"
                        },
                        {
                            title: "450 px",
                            value: "450"
                        },
                        {
                            title: "500 px",
                            value: "500"
                        },
                        {
                            title: "550 px",
                            value: "550"
                        },
                        {
                            title: "600 px",
                            value: "600"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "25% viewport",
                            value: "v25"
                        },
                        {
                            title: "50% viewport",
                            value: "v50"
                        },
                        {
                            title: "75% viewport",
                            value: "v75"
                        },
                        {
                            title: "100% viewport",
                            value: "v100"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "all screen",
                            prefix: "minw-"
                        },
                        {
                            label: "small-screen",
                            prefix: "minw-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "minw-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "minw-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "minw-xl-"
                        }]
                },
                {
                    label: "Max Width",
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "25%",
                            value: "p25"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "75%",
                            value: "p75"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "5 px",
                            value: "5"
                        },
                        {
                            title: "10 px",
                            value: "10"
                        },
                        {
                            title: "15 px",
                            value: "15"
                        },
                        {
                            title: "20 px",
                            value: "20"
                        },
                        {
                            title: "25 px",
                            value: "25"
                        },
                        {
                            title: "30 px",
                            value: "30"
                        },
                        {
                            title: "35 px",
                            value: "35"
                        },
                        {
                            title: "40 px",
                            value: "40"
                        },
                        {
                            title: "45 px",
                            value: "45"
                        },
                        {
                            title: "50 px",
                            value: "50"
                        },
                        {
                            title: "55 px",
                            value: "55"
                        },
                        {
                            title: "60 px",
                            value: "60"
                        },
                        {
                            title: "65 px",
                            value: "65"
                        },
                        {
                            title: "70 px",
                            value: "70"
                        },
                        {
                            title: "75 px",
                            value: "75"
                        },
                        {
                            title: "80 px",
                            value: "80"
                        },
                        {
                            title: "85 px",
                            value: "85"
                        },
                        {
                            title: "90 px",
                            value: "90"
                        },
                        {
                            title: "95 px",
                            value: "95"
                        },
                        {
                            title: "100 px",
                            value: "100"
                        },
                        {
                            title: "120 px",
                            value: "120"
                        },
                        {
                            title: "140 px",
                            value: "140"
                        },
                        {
                            title: "160 px",
                            value: "160"
                        },
                        {
                            title: "180 px",
                            value: "180"
                        },
                        {
                            title: "200 px",
                            value: "200"
                        },
                        {
                            title: "220 px",
                            value: "220"
                        },
                        {
                            title: "240 px",
                            value: "240"
                        },
                        {
                            title: "260 px",
                            value: "260"
                        },
                        {
                            title: "280 px",
                            value: "280"
                        },
                        {
                            title: "300 px",
                            value: "300"
                        },
                        {
                            title: "350 px",
                            value: "350"
                        },
                        {
                            title: "400 px",
                            value: "400"
                        },
                        {
                            title: "450 px",
                            value: "450"
                        },
                        {
                            title: "500 px",
                            value: "500"
                        },
                        {
                            title: "550 px",
                            value: "550"
                        },
                        {
                            title: "600 px",
                            value: "600"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "25% viewport",
                            value: "v25"
                        },
                        {
                            title: "50% viewport",
                            value: "v50"
                        },
                        {
                            title: "75% viewport",
                            value: "v75"
                        },
                        {
                            title: "100% viewport",
                            value: "v100"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "all screen",
                            prefix: "maxw-"
                        },
                        {
                            label: "small-screen",
                            prefix: "maxw-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "maxw-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "maxw-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "maxw-xl-"
                        }]
                },
                {
                    label: "Height",
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "25%",
                            value: "p25"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "75%",
                            value: "p75"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "5 px",
                            value: "5"
                        },
                        {
                            title: "10 px",
                            value: "10"
                        },
                        {
                            title: "15 px",
                            value: "15"
                        },
                        {
                            title: "20 px",
                            value: "20"
                        },
                        {
                            title: "25 px",
                            value: "25"
                        },
                        {
                            title: "30 px",
                            value: "30"
                        },
                        {
                            title: "35 px",
                            value: "35"
                        },
                        {
                            title: "40 px",
                            value: "40"
                        },
                        {
                            title: "45 px",
                            value: "45"
                        },
                        {
                            title: "50 px",
                            value: "50"
                        },
                        {
                            title: "55 px",
                            value: "55"
                        },
                        {
                            title: "60 px",
                            value: "60"
                        },
                        {
                            title: "65 px",
                            value: "65"
                        },
                        {
                            title: "70 px",
                            value: "70"
                        },
                        {
                            title: "75 px",
                            value: "75"
                        },
                        {
                            title: "80 px",
                            value: "80"
                        },
                        {
                            title: "85 px",
                            value: "85"
                        },
                        {
                            title: "90 px",
                            value: "90"
                        },
                        {
                            title: "95 px",
                            value: "95"
                        },
                        {
                            title: "100 px",
                            value: "100"
                        },
                        {
                            title: "120 px",
                            value: "120"
                        },
                        {
                            title: "140 px",
                            value: "140"
                        },
                        {
                            title: "160 px",
                            value: "160"
                        },
                        {
                            title: "180 px",
                            value: "180"
                        },
                        {
                            title: "200 px",
                            value: "200"
                        },
                        {
                            title: "220 px",
                            value: "220"
                        },
                        {
                            title: "240 px",
                            value: "240"
                        },
                        {
                            title: "260 px",
                            value: "260"
                        },
                        {
                            title: "280 px",
                            value: "280"
                        },
                        {
                            title: "300 px",
                            value: "300"
                        },
                        {
                            title: "350 px",
                            value: "350"
                        },
                        {
                            title: "400 px",
                            value: "400"
                        },
                        {
                            title: "450 px",
                            value: "450"
                        },
                        {
                            title: "500 px",
                            value: "500"
                        },
                        {
                            title: "550 px",
                            value: "550"
                        },
                        {
                            title: "600 px",
                            value: "600"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "25% viewport",
                            value: "v25"
                        },
                        {
                            title: "50% viewport",
                            value: "v50"
                        },
                        {
                            title: "75% viewport",
                            value: "v75"
                        },
                        {
                            title: "100% viewport",
                            value: "v100"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "all screen",
                            prefix: "h-"
                        },
                        {
                            label: "small-screen",
                            prefix: "h-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "h-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "h-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "h-xl-"
                        }]
                },
                {
                    label: "Min Height",
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "25%",
                            value: "p25"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "75%",
                            value: "p75"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "5 px",
                            value: "5"
                        },
                        {
                            title: "10 px",
                            value: "10"
                        },
                        {
                            title: "15 px",
                            value: "15"
                        },
                        {
                            title: "20 px",
                            value: "20"
                        },
                        {
                            title: "25 px",
                            value: "25"
                        },
                        {
                            title: "30 px",
                            value: "30"
                        },
                        {
                            title: "35 px",
                            value: "35"
                        },
                        {
                            title: "40 px",
                            value: "40"
                        },
                        {
                            title: "45 px",
                            value: "45"
                        },
                        {
                            title: "50 px",
                            value: "50"
                        },
                        {
                            title: "55 px",
                            value: "55"
                        },
                        {
                            title: "60 px",
                            value: "60"
                        },
                        {
                            title: "65 px",
                            value: "65"
                        },
                        {
                            title: "70 px",
                            value: "70"
                        },
                        {
                            title: "75 px",
                            value: "75"
                        },
                        {
                            title: "80 px",
                            value: "80"
                        },
                        {
                            title: "85 px",
                            value: "85"
                        },
                        {
                            title: "90 px",
                            value: "90"
                        },
                        {
                            title: "95 px",
                            value: "95"
                        },
                        {
                            title: "100 px",
                            value: "100"
                        },
                        {
                            title: "120 px",
                            value: "120"
                        },
                        {
                            title: "140 px",
                            value: "140"
                        },
                        {
                            title: "160 px",
                            value: "160"
                        },
                        {
                            title: "180 px",
                            value: "180"
                        },
                        {
                            title: "200 px",
                            value: "200"
                        },
                        {
                            title: "220 px",
                            value: "220"
                        },
                        {
                            title: "240 px",
                            value: "240"
                        },
                        {
                            title: "260 px",
                            value: "260"
                        },
                        {
                            title: "280 px",
                            value: "280"
                        },
                        {
                            title: "300 px",
                            value: "300"
                        },
                        {
                            title: "350 px",
                            value: "350"
                        },
                        {
                            title: "400 px",
                            value: "400"
                        },
                        {
                            title: "450 px",
                            value: "450"
                        },
                        {
                            title: "500 px",
                            value: "500"
                        },
                        {
                            title: "550 px",
                            value: "550"
                        },
                        {
                            title: "600 px",
                            value: "600"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "25% viewport",
                            value: "v25"
                        },
                        {
                            title: "50% viewport",
                            value: "v50"
                        },
                        {
                            title: "75% viewport",
                            value: "v75"
                        },
                        {
                            title: "100% viewport",
                            value: "v100"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "all screen",
                            prefix: "minh-"
                        },
                        {
                            label: "small-screen",
                            prefix: "minh-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "minh-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "minh-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "minh-xl-"
                        }]
                },
                {
                    label: "Max Height",
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "25%",
                            value: "p25"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "75%",
                            value: "p75"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "5 px",
                            value: "5"
                        },
                        {
                            title: "10 px",
                            value: "10"
                        },
                        {
                            title: "15 px",
                            value: "15"
                        },
                        {
                            title: "20 px",
                            value: "20"
                        },
                        {
                            title: "25 px",
                            value: "25"
                        },
                        {
                            title: "30 px",
                            value: "30"
                        },
                        {
                            title: "35 px",
                            value: "35"
                        },
                        {
                            title: "40 px",
                            value: "40"
                        },
                        {
                            title: "45 px",
                            value: "45"
                        },
                        {
                            title: "50 px",
                            value: "50"
                        },
                        {
                            title: "55 px",
                            value: "55"
                        },
                        {
                            title: "60 px",
                            value: "60"
                        },
                        {
                            title: "65 px",
                            value: "65"
                        },
                        {
                            title: "70 px",
                            value: "70"
                        },
                        {
                            title: "75 px",
                            value: "75"
                        },
                        {
                            title: "80 px",
                            value: "80"
                        },
                        {
                            title: "85 px",
                            value: "85"
                        },
                        {
                            title: "90 px",
                            value: "90"
                        },
                        {
                            title: "95 px",
                            value: "95"
                        },
                        {
                            title: "100 px",
                            value: "100"
                        },
                        {
                            title: "120 px",
                            value: "120"
                        },
                        {
                            title: "140 px",
                            value: "140"
                        },
                        {
                            title: "160 px",
                            value: "160"
                        },
                        {
                            title: "180 px",
                            value: "180"
                        },
                        {
                            title: "200 px",
                            value: "200"
                        },
                        {
                            title: "220 px",
                            value: "220"
                        },
                        {
                            title: "240 px",
                            value: "240"
                        },
                        {
                            title: "260 px",
                            value: "260"
                        },
                        {
                            title: "280 px",
                            value: "280"
                        },
                        {
                            title: "300 px",
                            value: "300"
                        },
                        {
                            title: "350 px",
                            value: "350"
                        },
                        {
                            title: "400 px",
                            value: "400"
                        },
                        {
                            title: "450 px",
                            value: "450"
                        },
                        {
                            title: "500 px",
                            value: "500"
                        },
                        {
                            title: "550 px",
                            value: "550"
                        },
                        {
                            title: "600 px",
                            value: "600"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "25% viewport",
                            value: "v25"
                        },
                        {
                            title: "50% viewport",
                            value: "v50"
                        },
                        {
                            title: "75% viewport",
                            value: "v75"
                        },
                        {
                            title: "100% viewport",
                            value: "v100"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "all screen",
                            prefix: "maxh-"
                        },
                        {
                            label: "small-screen",
                            prefix: "maxh-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "maxh-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "maxh-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "maxh-xl-"
                        }]
                }]
        },
        {
            label: "Flex box",
            groups: [
                {
                    values: [
                        {
                            title: "row",
                            value: "row"
                        },
                        {
                            title: "column",
                            value: "column"
                        },
                        {
                            title: "row-reverse",
                            value: "row-reverse"
                        },
                        {
                            title: "column-reverse",
                            value: "column-reverse"
                        }],
                    suffix: "[-\\w]+",
                    variants: [
                        {
                            label: "Direction",
                            prefix: "flex-direction-"
                        }]
                },
                {
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "1",
                            value: "1"
                        }],
                    suffix: "[\\d]+",
                    variants: [
                        {
                            label: "Grow",
                            prefix: "flex-grow-"
                        }]
                },
                {
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "1",
                            value: "1"
                        }],
                    suffix: "[\\d]+",
                    variants: [
                        {
                            label: "Shrink",
                            prefix: "flex-shrink-"
                        }]
                },
                {
                    values: [
                        {
                            title: "wrap",
                            value: "wrap"
                        },
                        {
                            title: "nowrap",
                            value: "nowrap"
                        },
                        {
                            title: "wrap-reverse",
                            value: "wrap-reverse"
                        }],
                    suffix: "[-\\w]+",
                    variants: [
                        {
                            label: "Flex wrap",
                            prefix: "flex-wrap-"
                        }]
                },
                {
                    values: [
                        {
                            title: "fill",
                            value: "fill"
                        }],
                    suffix: "fill",
                    variants: [
                        {
                            label: "Fill",
                            prefix: "flex-"
                        }]
                },
                {
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "1",
                            value: "1"
                        },
                        {
                            title: "2",
                            value: "2"
                        },
                        {
                            title: "3",
                            value: "3"
                        },
                        {
                            title: "4",
                            value: "4"
                        },
                        {
                            title: "5",
                            value: "5"
                        }],
                    suffix: "[\\d]+",
                    variants: [
                        {
                            label: "Gap",
                            prefix: "gap-"
                        }]
                },
                {
                    values: [
                        {
                            title: "start",
                            value: "start"
                        },
                        {
                            title: "center",
                            value: "center"
                        },
                        {
                            title: "end",
                            value: "end"
                        },
                        {
                            title: "between",
                            value: "between"
                        },
                        {
                            title: "around",
                            value: "around"
                        },
                        {
                            title: "evenly",
                            value: "evenly"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "Horizontal alignment",
                            prefix: "justify-content-"
                        }]
                },
                {
                    values: [
                        {
                            title: "start",
                            value: "start"
                        },
                        {
                            title: "center",
                            value: "center"
                        },
                        {
                            title: "end",
                            value: "end"
                        },
                        {
                            title: "baseline",
                            value: "baseline"
                        },
                        {
                            title: "stretch",
                            value: "stretch"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "Vertical alignment",
                            prefix: "align-items-"
                        }]
                },
                {
                    values: [
                        {
                            title: "start",
                            value: "start"
                        },
                        {
                            title: "center",
                            value: "center"
                        },
                        {
                            title: "end",
                            value: "end"
                        },
                        {
                            title: "baseline",
                            value: "baseline"
                        },
                        {
                            title: "stretch",
                            value: "stretch"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "Self Vertical alignment",
                            prefix: "align-self-"
                        }]
                },
                {
                    label: "Order",
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "1",
                            value: "1"
                        },
                        {
                            title: "2",
                            value: "2"
                        },
                        {
                            title: "3",
                            value: "3"
                        },
                        {
                            title: "4",
                            value: "4"
                        },
                        {
                            title: "5",
                            value: "5"
                        }],
                    suffix: "[\\d]+",
                    variants: [
                        {
                            label: "all screen",
                            prefix: "order-"
                        },
                        {
                            label: "small-screen",
                            prefix: "order-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "order-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "order-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "order-xl-"
                        }]
                }]
        },
        {
            label: "Positions",
            groups: [
                {
                    values: [
                        {
                            title: "static",
                            value: "static"
                        },
                        {
                            title: "relative",
                            value: "relative"
                        },
                        {
                            title: "absolute",
                            value: "absolute"
                        },
                        {
                            title: "fixed",
                            value: "fixed"
                        },
                        {
                            title: "sticky",
                            value: "sticky"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "Position",
                            prefix: "position-"
                        }]
                },
                {
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "5 px",
                            value: "5"
                        },
                        {
                            title: "10 px",
                            value: "10"
                        },
                        {
                            title: "15 px",
                            value: "15"
                        },
                        {
                            title: "20 px",
                            value: "20"
                        },
                        {
                            title: "25 px",
                            value: "25"
                        },
                        {
                            title: "30 px",
                            value: "30"
                        },
                        {
                            title: "35 px",
                            value: "35"
                        },
                        {
                            title: "40 px",
                            value: "40"
                        },
                        {
                            title: "45 px",
                            value: "45"
                        },
                        {
                            title: "50 px",
                            value: "50"
                        },
                        {
                            title: "55 px",
                            value: "55"
                        },
                        {
                            title: "60 px",
                            value: "60"
                        },
                        {
                            title: "65 px",
                            value: "65"
                        },
                        {
                            title: "70 px",
                            value: "70"
                        },
                        {
                            title: "75 px",
                            value: "75"
                        },
                        {
                            title: "80 px",
                            value: "80"
                        },
                        {
                            title: "85 px",
                            value: "85"
                        },
                        {
                            title: "90 px",
                            value: "90"
                        },
                        {
                            title: "95 px",
                            value: "95"
                        },
                        {
                            title: "100 px",
                            value: "100"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "Left",
                            prefix: "start-"
                        }]
                },
                {
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "5 px",
                            value: "5"
                        },
                        {
                            title: "10 px",
                            value: "10"
                        },
                        {
                            title: "15 px",
                            value: "15"
                        },
                        {
                            title: "20 px",
                            value: "20"
                        },
                        {
                            title: "25 px",
                            value: "25"
                        },
                        {
                            title: "30 px",
                            value: "30"
                        },
                        {
                            title: "35 px",
                            value: "35"
                        },
                        {
                            title: "40 px",
                            value: "40"
                        },
                        {
                            title: "45 px",
                            value: "45"
                        },
                        {
                            title: "50 px",
                            value: "50"
                        },
                        {
                            title: "55 px",
                            value: "55"
                        },
                        {
                            title: "60 px",
                            value: "60"
                        },
                        {
                            title: "65 px",
                            value: "65"
                        },
                        {
                            title: "70 px",
                            value: "70"
                        },
                        {
                            title: "75 px",
                            value: "75"
                        },
                        {
                            title: "80 px",
                            value: "80"
                        },
                        {
                            title: "85 px",
                            value: "85"
                        },
                        {
                            title: "90 px",
                            value: "90"
                        },
                        {
                            title: "95 px",
                            value: "95"
                        },
                        {
                            title: "100 px",
                            value: "100"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "Top",
                            prefix: "top-"
                        }]
                },
                {
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "5 px",
                            value: "5"
                        },
                        {
                            title: "10 px",
                            value: "10"
                        },
                        {
                            title: "15 px",
                            value: "15"
                        },
                        {
                            title: "20 px",
                            value: "20"
                        },
                        {
                            title: "25 px",
                            value: "25"
                        },
                        {
                            title: "30 px",
                            value: "30"
                        },
                        {
                            title: "35 px",
                            value: "35"
                        },
                        {
                            title: "40 px",
                            value: "40"
                        },
                        {
                            title: "45 px",
                            value: "45"
                        },
                        {
                            title: "50 px",
                            value: "50"
                        },
                        {
                            title: "55 px",
                            value: "55"
                        },
                        {
                            title: "60 px",
                            value: "60"
                        },
                        {
                            title: "65 px",
                            value: "65"
                        },
                        {
                            title: "70 px",
                            value: "70"
                        },
                        {
                            title: "75 px",
                            value: "75"
                        },
                        {
                            title: "80 px",
                            value: "80"
                        },
                        {
                            title: "85 px",
                            value: "85"
                        },
                        {
                            title: "90 px",
                            value: "90"
                        },
                        {
                            title: "95 px",
                            value: "95"
                        },
                        {
                            title: "100 px",
                            value: "100"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "Right",
                            prefix: "end-"
                        }]
                },
                {
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "5 px",
                            value: "5"
                        },
                        {
                            title: "10 px",
                            value: "10"
                        },
                        {
                            title: "15 px",
                            value: "15"
                        },
                        {
                            title: "20 px",
                            value: "20"
                        },
                        {
                            title: "25 px",
                            value: "25"
                        },
                        {
                            title: "30 px",
                            value: "30"
                        },
                        {
                            title: "35 px",
                            value: "35"
                        },
                        {
                            title: "40 px",
                            value: "40"
                        },
                        {
                            title: "45 px",
                            value: "45"
                        },
                        {
                            title: "50 px",
                            value: "50"
                        },
                        {
                            title: "55 px",
                            value: "55"
                        },
                        {
                            title: "60 px",
                            value: "60"
                        },
                        {
                            title: "65 px",
                            value: "65"
                        },
                        {
                            title: "70 px",
                            value: "70"
                        },
                        {
                            title: "75 px",
                            value: "75"
                        },
                        {
                            title: "80 px",
                            value: "80"
                        },
                        {
                            title: "85 px",
                            value: "85"
                        },
                        {
                            title: "90 px",
                            value: "90"
                        },
                        {
                            title: "95 px",
                            value: "95"
                        },
                        {
                            title: "100 px",
                            value: "100"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "Bottom",
                            prefix: "bottom-"
                        }]
                }]
        },
        {
            label: "Aspect",
            groups: [
                {
                    values: [
                        {
                            title: "enable ratio",
                            value: "ratio"
                        }],
                    suffix: "^ratio$",
                    variants: [
                        {
                            label: "Ratio",
                            prefix: ""
                        }]
                },
                {
                    values: [
                        {
                            title: "1:1",
                            value: "1x1"
                        },
                        {
                            title: "4:3",
                            value: "4x3"
                        },
                        {
                            title: "16:9",
                            value: "16x9"
                        },
                        {
                            title: "21:9",
                            value: "21x9"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "Size",
                            prefix: "ratio-"
                        }]
                },
                {
                    values: [
                        {
                            title: "cover",
                            value: "cover"
                        },
                        {
                            title: "contain",
                            value: "contain"
                        }],
                    suffix: "[\\w]+",
                    variants: [
                        {
                            label: "Fit",
                            prefix: "object-fit-"
                        }]
                }]
        },
        {
            label: "Utilities",
            groups: [
                {
                    values: [
                        {
                            title: "baseline",
                            value: "baseline"
                        },
                        {
                            title: "top",
                            value: "top"
                        },
                        {
                            title: "middle",
                            value: "middle"
                        },
                        {
                            title: "bottom",
                            value: "bottom"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "Vertical Alignment",
                            prefix: "align-"
                        }]
                },
                {
                    values: [
                        {
                            title: "block",
                            value: "block"
                        },
                        {
                            title: "inline-block",
                            value: "inline-block"
                        },
                        {
                            title: "inline",
                            value: "inline"
                        },
                        {
                            title: "grid",
                            value: "grid"
                        },
                        {
                            title: "flex",
                            value: "flex"
                        },
                        {
                            title: "inline-flex",
                            value: "inline-flex"
                        },
                        {
                            title: "none",
                            value: "none"
                        }],
                    suffix: "[-\\w]+",
                    variants: [
                        {
                            label: "Display",
                            prefix: "d-"
                        }]
                },
                {
                    values: [
                        {
                            title: "start",
                            value: "start"
                        },
                        {
                            title: "end",
                            value: "end"
                        },
                        {
                            title: "none",
                            value: "none"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "Float",
                            prefix: "float-"
                        }]
                },
                {
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "10%",
                            value: "p10"
                        },
                        {
                            title: "20%",
                            value: "p20"
                        },
                        {
                            title: "30%",
                            value: "p30"
                        },
                        {
                            title: "40%",
                            value: "p40"
                        },
                        {
                            title: "50%",
                            value: "p50"
                        },
                        {
                            title: "60%",
                            value: "p60"
                        },
                        {
                            title: "70%",
                            value: "p70"
                        },
                        {
                            title: "80%",
                            value: "p80"
                        },
                        {
                            title: "90%",
                            value: "p90"
                        },
                        {
                            title: "100%",
                            value: "p100"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "Opacity",
                            prefix: "opacity-"
                        }]
                },
                {
                    values: [
                        {
                            title: "auto",
                            value: "auto"
                        },
                        {
                            title: "hidden",
                            value: "hidden"
                        },
                        {
                            title: "visible",
                            value: "visible"
                        },
                        {
                            title: "scroll",
                            value: "scroll"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "Overflow",
                            prefix: "overflow-"
                        }]
                },
                {
                    values: [
                        {
                            title: "shadow",
                            value: ""
                        },
                        {
                            title: "no shadow",
                            value: "-none"
                        },
                        {
                            title: "small",
                            value: "-sm"
                        },
                        {
                            title: "large",
                            value: "-lg"
                        }],
                    suffix: "[-\\w]*",
                    variants: [
                        {
                            label: "Shadow",
                            prefix: "shadow"
                        }]
                },
                {
                    values: [
                        {
                            title: "all",
                            value: "all"
                        },
                        {
                            title: "auto",
                            value: "auto"
                        },
                        {
                            title: "none",
                            value: "none"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "User select",
                            prefix: "user-select-"
                        }]
                },
                {
                    values: [
                        {
                            title: "visible",
                            value: "visible"
                        },
                        {
                            title: "hidden",
                            value: "hidden"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "Visibility",
                            prefix: "visibility-"
                        }]
                }]
        }],
    elementSelectClass: {
        imageBlock: {
            label: "Image classes",
            groups: [
                {
                    values: [
                        {
                            title: "fluid",
                            value: "img-fluid"
                        },
                        {
                            title: "thumbnail",
                            value: "img-thumbnail"
                        },
                        {
                            title: "rounded",
                            value: "rounded"
                        }],
                    suffix: "[-\\w]*",
                    variants: [
                        {
                            label: "Type",
                            prefix: ""
                        }],
                    multiple: true
                }]
        },
        content: {},
        column: {
            label: "Column classes",
            groups: [
                {
                    label: "width",
                    values: [
                        {
                            title: "1/12",
                            value: "1"
                        },
                        {
                            title: "2/12",
                            value: "2"
                        },
                        {
                            title: "3/12",
                            value: "3"
                        },
                        {
                            title: "4/12",
                            value: "4"
                        },
                        {
                            title: "5/12",
                            value: "5"
                        },
                        {
                            title: "6/12",
                            value: "6"
                        },
                        {
                            title: "7/12",
                            value: "7"
                        },
                        {
                            title: "8/12",
                            value: "8"
                        },
                        {
                            title: "9/12",
                            value: "9"
                        },
                        {
                            title: "10/12",
                            value: "10"
                        },
                        {
                            title: "11/12",
                            value: "11"
                        },
                        {
                            title: "12/12",
                            value: "12"
                        }],
                    suffix: "[\\d]+",
                    variants: [
                        {
                            label: "all-screen",
                            prefix: "col-"
                        },
                        {
                            label: "small-screen",
                            prefix: "col-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "col-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "col-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "col-xl-"
                        }]
                },
                {
                    label: "offset",
                    values: [
                        {
                            title: "1",
                            value: "1"
                        },
                        {
                            title: "2",
                            value: "2"
                        },
                        {
                            title: "3",
                            value: "3"
                        },
                        {
                            title: "4",
                            value: "4"
                        },
                        {
                            title: "5",
                            value: "5"
                        },
                        {
                            title: "6",
                            value: "6"
                        },
                        {
                            title: "7",
                            value: "7"
                        },
                        {
                            title: "8",
                            value: "8"
                        },
                        {
                            title: "9",
                            value: "9"
                        },
                        {
                            title: "10",
                            value: "10"
                        },
                        {
                            title: "11",
                            value: "11"
                        },
                        {
                            title: "12",
                            value: "12"
                        }],
                    suffix: "[\\d]+",
                    variants: [
                        {
                            label: "all-screen",
                            prefix: "offset-"
                        },
                        {
                            label: "small-screen",
                            prefix: "offset-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "offset-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "offset-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "offset-xl-"
                        }]
                },
                {
                    label: "Order",
                    values: [
                        {
                            title: "0",
                            value: "0"
                        },
                        {
                            title: "1",
                            value: "1"
                        },
                        {
                            title: "2",
                            value: "2"
                        },
                        {
                            title: "3",
                            value: "3"
                        },
                        {
                            title: "4",
                            value: "4"
                        },
                        {
                            title: "5",
                            value: "5"
                        }],
                    suffix: "[\\d]+",
                    variants: [
                        {
                            label: "all screen",
                            prefix: "order-"
                        },
                        {
                            label: "small-screen",
                            prefix: "order-sm-"
                        },
                        {
                            label: "medium-screen",
                            prefix: "order-md-"
                        },
                        {
                            label: "large-screen",
                            prefix: "order-lg-"
                        },
                        {
                            label: "extra-large-screen",
                            prefix: "order-xl-"
                        }]
                },
                {
                    values: [
                        {
                            title: "start",
                            value: "start"
                        },
                        {
                            title: "center",
                            value: "center"
                        },
                        {
                            title: "end",
                            value: "end"
                        },
                        {
                            title: "baseline",
                            value: "baseline"
                        },
                        {
                            title: "stretch",
                            value: "stretch"
                        }],
                    suffix: "[\\d\\w]+",
                    variants: [
                        {
                            label: "Self Vertical alignment",
                            prefix: "align-self-"
                        }]
                }]
        },
        row:
            {
                label: "Row classes",
                groups: [
                    {
                        label: "column items",
                        values: [
                            {
                                title: "1",
                                value: "1"
                            },
                            {
                                title: "2",
                                value: "2"
                            },
                            {
                                title: "3",
                                value: "3"
                            },
                            {
                                title: "4",
                                value: "4"
                            },
                            {
                                title: "5",
                                value: "5"
                            },
                            {
                                title: "6",
                                value: "6"
                            },
                            {
                                title: "7",
                                value: "7"
                            },
                            {
                                title: "8",
                                value: "8"
                            },
                            {
                                title: "9",
                                value: "9"
                            },
                            {
                                title: "10",
                                value: "10"
                            },
                            {
                                title: "11",
                                value: "11"
                            },
                            {
                                title: "12",
                                value: "12"
                            }],
                        suffix: "[\\d]+",
                        variants: [
                            {
                                label: "all-screen",
                                prefix: "row-cols-"
                            },
                            {
                                label: "small-screen",
                                prefix: "row-cols-sm-"
                            },
                            {
                                label: "medium-screen",
                                prefix: "row-cols-md-"
                            },
                            {
                                label: "large-screen",
                                prefix: "row-cols-lg-"
                            },
                            {
                                label: "extra-large-screen",
                                prefix: "row-cols-xl-"
                            }]
                    },
                    {
                        values: [
                            {
                                title: "start",
                                value: "start"
                            },
                            {
                                title: "center",
                                value: "center"
                            },
                            {
                                title: "end",
                                value: "end"
                            },
                            {
                                title: "baseline",
                                value: "baseline"
                            },
                            {
                                title: "stretch",
                                value: "stretch"
                            }],
                        suffix: "[\\d\\w]+",
                        variants: [
                            {
                                label: "Vertical alignment",
                                prefix: "align-items-"
                            }]
                    },
                    {
                        values: [
                            {
                                title: "start",
                                value: "start"
                            },
                            {
                                title: "center",
                                value: "center"
                            },
                            {
                                title: "end",
                                value: "end"
                            },
                            {
                                title: "between",
                                value: "between"
                            },
                            {
                                title: "around",
                                value: "around"
                            },
                            {
                                title: "evenly",
                                value: "evenly"
                            }],
                        suffix: "[\\d\\w]+",
                        variants: [
                            {
                                label: "Horizontal alignment",
                                prefix: "justify-content-"
                            }]
                    },
                    {
                        label: "gutter",
                        values: [
                            {
                                title: "0",
                                value: "0"
                            },
                            {
                                title: "1",
                                value: "1"
                            },
                            {
                                title: "2",
                                value: "2"
                            },
                            {
                                title: "3",
                                value: "3"
                            },
                            {
                                title: "4",
                                value: "4"
                            },
                            {
                                title: "5",
                                value: "5"
                            }],
                        suffix: "[\\d]+",
                        variants: [
                            {
                                label: "all-screen",
                                prefix: "g-"
                            },
                            {
                                label: "small-screen",
                                prefix: "g-sm-"
                            },
                            {
                                label: "medium-screen",
                                prefix: "g-md-"
                            },
                            {
                                label: "large-screen",
                                prefix: "g-lg-"
                            },
                            {
                                label: "extra-large-screen",
                                prefix: "g-xl-"
                            }]
                    },
                    {
                        label: "horizontal gutter",
                        values: [
                            {
                                title: "0",
                                value: "0"
                            },
                            {
                                title: "1",
                                value: "1"
                            },
                            {
                                title: "2",
                                value: "2"
                            },
                            {
                                title: "3",
                                value: "3"
                            },
                            {
                                title: "4",
                                value: "4"
                            },
                            {
                                title: "5",
                                value: "5"
                            }],
                        suffix: "[\\d]+",
                        variants: [
                            {
                                label: "all-screen",
                                prefix: "gx-"
                            },
                            {
                                label: "small-screen",
                                prefix: "gx-sm-"
                            },
                            {
                                label: "medium-screen",
                                prefix: "gx-md-"
                            },
                            {
                                label: "large-screen",
                                prefix: "gx-lg-"
                            },
                            {
                                label: "extra-large-screen",
                                prefix: "gx-xl-"
                            }]
                    },
                    {
                        label: "vertical gutter",
                        values: [
                            {
                                title: "0",
                                value: "0"
                            },
                            {
                                title: "1",
                                value: "1"
                            },
                            {
                                title: "2",
                                value: "2"
                            },
                            {
                                title: "3",
                                value: "3"
                            },
                            {
                                title: "4",
                                value: "4"
                            },
                            {
                                title: "5",
                                value: "5"
                            }],
                        suffix: "[\\d]+",
                        variants: [
                            {
                                label: "all-screen",
                                prefix: "gy-"
                            },
                            {
                                label: "small-screen",
                                prefix: "gy-sm-"
                            },
                            {
                                label: "medium-screen",
                                prefix: "gy-md-"
                            },
                            {
                                label: "large-screen",
                                prefix: "gy-lg-"
                            },
                            {
                                label: "extra-large-screen",
                                prefix: "gy-xl-"
                            }]
                    }]
            },
        container:
            {
                label: "Container classes",
                groups: [
                    {
                        values: [
                            {
                                title: "default",
                                value: ""
                            },
                            {
                                title: "small",
                                value: "-sm"
                            },
                            {
                                title: "medium",
                                value: "-md"
                            },
                            {
                                title: "large",
                                value: "-lg"
                            },
                            {
                                title: "X large",
                                value: "-xl"
                            },
                            {
                                title: "XX large",
                                value: "-xxl"
                            },
                            {
                                title: "fluid",
                                value: "-fluid"
                            }],
                        suffix: "[-\\w]*",
                        variants: [
                            {
                                label: "Type",
                                prefix: "container"
                            }],
                        required: true
                    }]
            },
        section:
            {},
        block:
            {},
        element:
            {
                label: "element classes",
                groups: [
                    {
                        values: [
                            {
                                title: "button",
                                value: "btn"
                            },
                            {
                                title: "stretched link",
                                value: "stretched-link"
                            }],
                        suffix: "",
                        variants: [
                            {
                                label: "Type",
                                prefix: ""
                            }],
                        multiple: true
                    },
                    {
                        values: [
                            {
                                title: "theme",
                                value: "theme"
                            },
                            {
                                title: "accent",
                                value: "accent"
                            },
                            {
                                title: "primary",
                                value: "primary"
                            },
                            {
                                title: "secondary",
                                value: "secondary"
                            },
                            {
                                title: "tertiary",
                                value: "tertiary"
                            },
                            {
                                title: "success",
                                value: "success"
                            },
                            {
                                title: "info",
                                value: "info"
                            },
                            {
                                title: "warning",
                                value: "warning"
                            },
                            {
                                title: "danger",
                                value: "danger"
                            },
                            {
                                title: "light",
                                value: "light"
                            },
                            {
                                title: "dark",
                                value: "dark"
                            },
                            {
                                title: "white",
                                value: "white"
                            },
                            {
                                title: "black",
                                value: "black"
                            }],
                        suffix: "[-\\w]+",
                        variants: [
                            {
                                label: "Link color",
                                prefix: "link-"
                            }]
                    },
                    {
                        values: [
                            {
                                title: "facebook",
                                value: "facebook"
                            },
                            {
                                title: "dropbox",
                                value: "dropbox"
                            },
                            {
                                title: "github",
                                value: "github"
                            },
                            {
                                title: "instagram",
                                value: "instagram"
                            },
                            {
                                title: "pinterest",
                                value: "pinterest"
                            },
                            {
                                title: "tumblr",
                                value: "tumblr"
                            },
                            {
                                title: "youtube",
                                value: "youtube"
                            },
                            {
                                title: "dribble",
                                value: "dribble"
                            },
                            {
                                title: "flickr",
                                value: "flickr"
                            },
                            {
                                title: "google +",
                                value: "googleplus"
                            },
                            {
                                title: "linkedin",
                                value: "linkedin"
                            },
                            {
                                title: "skype",
                                value: "skype"
                            },
                            {
                                title: "twitter",
                                value: "twitter"
                            },
                            {
                                type: "separator"
                            },
                            {
                                title: "outline facebook",
                                value: "outline-facebook"
                            },
                            {
                                title: "outline dropbox",
                                value: "outline-dropbox"
                            },
                            {
                                title: "outline github",
                                value: "outline-github"
                            },
                            {
                                title: "outline instagram",
                                value: "outline-instagram"
                            },
                            {
                                title: "outline pinterest",
                                value: "outline-pinterest"
                            },
                            {
                                title: "outline tumblr",
                                value: "outline-tumblr"
                            },
                            {
                                title: "outline youtube",
                                value: "outline-youtube"
                            },
                            {
                                title: "outline dribble",
                                value: "outline-dribble"
                            },
                            {
                                title: "outline flickr",
                                value: "outline-flickr"
                            },
                            {
                                title: "outline google +",
                                value: "outline-googleplus"
                            },
                            {
                                title: "outline linkedin",
                                value: "outline-linkedin"
                            },
                            {
                                title: "outline skype",
                                value: "outline-skype"
                            },
                            {
                                title: "outline twitter",
                                value: "outline-twitter"
                            }],
                        suffix: "[-\\w]+",
                        variants: [
                            {
                                label: "Social-media Button",
                                prefix: "social-btn-"
                            }]
                    },
                    {
                        values: [
                            {
                                title: "theme",
                                value: "theme"
                            },
                            {
                                title: "accent",
                                value: "accent"
                            },
                            {
                                title: "primary",
                                value: "primary"
                            },
                            {
                                title: "secondary",
                                value: "secondary"
                            },
                            {
                                title: "tertiary",
                                value: "tertiary"
                            },
                            {
                                title: "success",
                                value: "success"
                            },
                            {
                                title: "info",
                                value: "info"
                            },
                            {
                                title: "warning",
                                value: "warning"
                            },
                            {
                                title: "danger",
                                value: "danger"
                            },
                            {
                                title: "light",
                                value: "light"
                            },
                            {
                                title: "dark",
                                value: "dark"
                            },
                            {
                                title: "white",
                                value: "white"
                            },
                            {
                                title: "black",
                                value: "black"
                            },
                            {
                                type: "separator"
                            },
                            {
                                title: "outline theme",
                                value: "outline-theme"
                            },
                            {
                                title: "outline accent",
                                value: "outline-accent"
                            },
                            {
                                title: "outline primary",
                                value: "outline-primary"
                            },
                            {
                                title: "outline secondary",
                                value: "outline-secondary"
                            },
                            {
                                title: "outline tertiary",
                                value: "outline-tertiary"
                            },
                            {
                                title: "outline success",
                                value: "outline-success"
                            },
                            {
                                title: "outline info",
                                value: "outline-info"
                            },
                            {
                                title: "outline warning",
                                value: "outline-warning"
                            },
                            {
                                title: "outline danger",
                                value: "outline-danger"
                            },
                            {
                                title: "outline light",
                                value: "outline-light"
                            },
                            {
                                title: "outline dark",
                                value: "outline-dark"
                            },
                            {
                                title: "outline white",
                                value: "outline-white"
                            },
                            {
                                title: "outline black",
                                value: "outline-black"
                            }],
                        suffix: "[-\\w]+",
                        variants: [
                            {
                                label: "Button color",
                                prefix: "btn-c-"
                            }]
                    },
                    {
                        values: [
                            {
                                title: "small",
                                value: "sm"
                            },
                            {
                                title: "medium",
                                value: "md"
                            },
                            {
                                title: "large",
                                value: "lg"
                            },
                            {
                                title: "extra large",
                                value: "xl"
                            }],
                        suffix: "[\\w]+",
                        variants: [
                            {
                                label: "Button size",
                                prefix: "btn-s-"
                            }]
                    },
                    {
                        values: [
                            {
                                title: "square",
                                value: "0"
                            },
                            {
                                title: "pill",
                                value: "pill"
                            },
                            {
                                title: "circle",
                                value: "circle"
                            }],
                        suffix: "[\\d\\w]+",
                        variants: [
                            {
                                label: "Shape",
                                prefix: "rounded-"
                            }]
                    },
                    {
                        values: [
                            {
                                title: "back",
                                value: "back"
                            },
                            {
                                title: "forward",
                                value: "forward"
                            },
                            {
                                title: "down",
                                value: "down"
                            },
                            {
                                title: "up",
                                value: "up"
                            },
                            {
                                title: "spin",
                                value: "spin"
                            },
                            {
                                title: "drop",
                                value: "drop"
                            },
                            {
                                title: "float away",
                                value: "float-away"
                            },
                            {
                                title: "sink away",
                                value: "sink-away"
                            },
                            {
                                title: "grow",
                                value: "grow"
                            },
                            {
                                title: "shrink",
                                value: "shrink"
                            },
                            {
                                title: "pulse",
                                value: "pulse"
                            },
                            {
                                title: "pulse grow",
                                value: "pulse-grow"
                            },
                            {
                                title: "pulse shrink",
                                value: "pulse-shrink"
                            },
                            {
                                title: "push",
                                value: "push"
                            },
                            {
                                title: "pop",
                                value: "pop"
                            },
                            {
                                title: "bounce",
                                value: "bounce"
                            },
                            {
                                title: "bounce out",
                                value: "bounce-out"
                            },
                            {
                                title: "rotate",
                                value: "rotate"
                            },
                            {
                                title: "grow rotate",
                                value: "grow-rotate"
                            },
                            {
                                title: "float",
                                value: "float"
                            },
                            {
                                title: "sink",
                                value: "sink"
                            },
                            {
                                title: "bob",
                                value: "bob"
                            },
                            {
                                title: "hang",
                                value: "hang"
                            },
                            {
                                title: "wobble horizontal",
                                value: "wobble-x"
                            },
                            {
                                title: "wobble vertical",
                                value: "wobble-y"
                            },
                            {
                                title: "buzz",
                                value: "buzz"
                            },
                            {
                                title: "buzz out",
                                value: "buzz-out"
                            },
                            {
                                title: "scroll down",
                                value: "scroll-down"
                            },
                            {
                                title: "scroll up",
                                value: "scroll-up"
                            }],
                        suffix: "[\\d\\w]+",
                        variants: [
                            {
                                label: "Hover icon animation",
                                prefix: "hvr-ic-"
                            }]
                    }]
            },
        media:
            {
                label: "Media classes",
                groups: [
                    {
                        values: [
                            {
                                title: "Ratio",
                                value: ""
                            }],
                        suffix: "",
                        variants: [
                            {
                                label: "Ratio",
                                prefix: "ratio"
                            }],
                        multiple: true
                    },
                    {
                        values: [
                            {
                                title: "1:1",
                                value: "1x1"
                            },
                            {
                                title: "4:3",
                                value: "4x3"
                            },
                            {
                                title: "16:9",
                                value: "16x9"
                            },
                            {
                                title: "21:9",
                                value: "21x9"
                            }],
                        suffix: "[-\\d\\w]+",
                        variants: [
                            {
                                label: "Ratio aspect",
                                prefix: "ratio-"
                            }]
                    }]
            },
        table:
            {
                label: "Table classes",
                groups: [
                    {
                        values: [
                            {
                                title: "small",
                                value: "table-sm"
                            },
                            {
                                title: "responsive",
                                value: "table-responsive"
                            },
                            {
                                title: "hover",
                                value: "table-hover"
                            },
                            {
                                title: "striped",
                                value: "table-striped"
                            }],
                        suffix: "",
                        variants: [
                            {
                                label: "Variants",
                                prefix: ""
                            }],
                        multiple: true
                    },
                    {
                        values: [
                            {
                                title: "bordered",
                                value: "ed"
                            },
                            {
                                title: "borderless",
                                value: "less"
                            }],
                        suffix: "[\\w]+",
                        variants: [
                            {
                                label: "Border",
                                prefix: "table-border"
                            }]
                    },
                    {
                        values: [
                            {
                                title: "1:1",
                                value: "1x1"
                            },
                            {
                                title: "4:3",
                                value: "4x3"
                            },
                            {
                                title: "16:9",
                                value: "16x9"
                            },
                            {
                                title: "21:9",
                                value: "21x9"
                            }],
                        suffix: "[-\\d\\w]+",
                        variants: [
                            {
                                label: "Ratio aspect",
                                prefix: "ratio-"
                            }]
                    }]
            }
    },
    generalDataAttribute: [
        {
            label: "Animation event",
            groups: [
                {
                    label: "Animation",
                    type: [],
                    activator: true,
                    values: [
                        {
                            title: "bounce",
                            value: "bounce"
                        },
                        {
                            title: "flash",
                            value: "flash"
                        },
                        {
                            title: "pulse",
                            value: "pulse"
                        },
                        {
                            title: "rubber Band",
                            value: "rubberBand"
                        },
                        {
                            title: "shake horizontal",
                            value: "shakeX"
                        },
                        {
                            title: "shake vertical ",
                            value: "shakeY"
                        },
                        {
                            title: "head shake",
                            value: "headShake"
                        },
                        {
                            title: "swing",
                            value: "swing"
                        },
                        {
                            title: "tada",
                            value: "tada"
                        },
                        {
                            title: "wobble",
                            value: "wobble"
                        },
                        {
                            title: "jello",
                            value: "jello"
                        },
                        {
                            title: "heart Beat",
                            value: "heartBeat"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "back In Down",
                            value: "backInDown"
                        },
                        {
                            title: "back In Left",
                            value: "backInLeft"
                        },
                        {
                            title: "back In Right",
                            value: "backInRight"
                        },
                        {
                            title: "back In Up",
                            value: "backInUp"
                        },
                        {
                            title: "back Out Down",
                            value: "backOutDown"
                        },
                        {
                            title: "back Out Left",
                            value: "backOutLeft"
                        },
                        {
                            title: "back Out Right",
                            value: "backOutRight"
                        },
                        {
                            title: "back Out Up",
                            value: "backOutUp"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "bounce In",
                            value: "bounceIn"
                        },
                        {
                            title: "bounce In Down",
                            value: "bounceInDown"
                        },
                        {
                            title: "bounce In Left",
                            value: "bounceInLeft"
                        },
                        {
                            title: "bounce In Right",
                            value: "bounceInRight"
                        },
                        {
                            title: "bounce In Up",
                            value: "bounceInUp"
                        },
                        {
                            title: "bounce Out",
                            value: "bounceOut"
                        },
                        {
                            title: "bounce Out Down",
                            value: "bounceOutDown"
                        },
                        {
                            title: "bounce Out Left",
                            value: "bounceOutLeft"
                        },
                        {
                            title: "bounce Out Right",
                            value: "bounceOutRight"
                        },
                        {
                            title: "bounce Out Up",
                            value: "bounceOutUp"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "fade In",
                            value: "fadeIn"
                        },
                        {
                            title: "fade In Down",
                            value: "fadeInDown"
                        },
                        {
                            title: "fade In Down Big",
                            value: "fadeInDownBig"
                        },
                        {
                            title: "fade In Left",
                            value: "fadeInLeft"
                        },
                        {
                            title: "fade In Left Big",
                            value: "fadeInLeftBig"
                        },
                        {
                            title: "fade In Right",
                            value: "fadeInRight"
                        },
                        {
                            title: "fade In Right Big",
                            value: "fadeInRightBig"
                        },
                        {
                            title: "fade In Up",
                            value: "fadeInUp"
                        },
                        {
                            title: "fade In Up Big",
                            value: "fadeInUpBig"
                        },
                        {
                            title: "fade In Top Left",
                            value: "fadeInTopLeft"
                        },
                        {
                            title: "fade In Top Right",
                            value: "fadeInTopRight"
                        },
                        {
                            title: "fade In Bottom Left",
                            value: "fadeInBottomLeft"
                        },
                        {
                            title: "fade In Bottom Right",
                            value: "fadeInBottomRight"
                        },
                        {
                            title: "fade Out",
                            value: "fadeOut"
                        },
                        {
                            title: "fade Out Down",
                            value: "fadeOutDown"
                        },
                        {
                            title: "fade Out Down Big",
                            value: "fadeOutDownBig"
                        },
                        {
                            title: "fade Out Left",
                            value: "fadeOutLeft"
                        },
                        {
                            title: "fade Out Left Big",
                            value: "fadeOutLeftBig"
                        },
                        {
                            title: "fade Out Right",
                            value: "fadeOutRight"
                        },
                        {
                            title: "fade Out Right Big",
                            value: "fadeOutRightBig"
                        },
                        {
                            title: "fade Out Up",
                            value: "fadeOutUp"
                        },
                        {
                            title: "fade Out Up Big",
                            value: "fadeOutUpBig"
                        },
                        {
                            title: "fade Out Top Left",
                            value: "fadeOutTopLeft"
                        },
                        {
                            title: "fade Out Top Right",
                            value: "fadeOutTopRight"
                        },
                        {
                            title: "fade Out Bottom Right",
                            value: "fadeOutBottomRight"
                        },
                        {
                            title: "fade Out Bottom Left",
                            value: "fadeOutBottomLeft"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "flip",
                            value: "flip"
                        },
                        {
                            title: "flip In X",
                            value: "flipInX"
                        },
                        {
                            title: "flip In Y",
                            value: "flipInY"
                        },
                        {
                            title: "flip Out X",
                            value: "flipOutX"
                        },
                        {
                            title: "flip Out Y",
                            value: "flipOutY"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "light Speed In Right",
                            value: "lightSpeedInRight"
                        },
                        {
                            title: "light Speed In Left",
                            value: "lightSpeedInLeft"
                        },
                        {
                            title: "light Speed Out Right",
                            value: "lightSpeedOutRight"
                        },
                        {
                            title: "light Speed Out Left",
                            value: "lightSpeedOutLeft"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "rotate In",
                            value: "rotateIn"
                        },
                        {
                            title: "rotate In Down Left",
                            value: "rotateInDownLeft"
                        },
                        {
                            title: "rotate In Down Right",
                            value: "rotateInDownRight"
                        },
                        {
                            title: "rotate In Up Left",
                            value: "rotateInUpLeft"
                        },
                        {
                            title: "rotate In Up Right",
                            value: "rotateInUpRight"
                        },
                        {
                            title: "rotate Out",
                            value: "rotateOut"
                        },
                        {
                            title: "rotate Out Down Left",
                            value: "rotateOutDownLeft"
                        },
                        {
                            title: "rotate Out Down Right",
                            value: "rotateOutDownRight"
                        },
                        {
                            title: "rotate Out Up Left",
                            value: "rotateOutUpLeft"
                        },
                        {
                            title: "rotate Out Up Right",
                            value: "rotateOutUpRight"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "hinge",
                            value: "hinge"
                        },
                        {
                            title: "jack In The Box",
                            value: "jackInTheBox"
                        },
                        {
                            title: "roll In",
                            value: "rollIn"
                        },
                        {
                            title: "roll Out",
                            value: "rollOut"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "zoom In",
                            value: "zoomIn"
                        },
                        {
                            title: "zoom In Down",
                            value: "zoomInDown"
                        },
                        {
                            title: "zoom In Left",
                            value: "zoomInLeft"
                        },
                        {
                            title: "zoom In Right",
                            value: "zoomInRight"
                        },
                        {
                            title: "zoom In Up",
                            value: "zoomInUp"
                        },
                        {
                            title: "zoom Out",
                            value: "zoomOut"
                        },
                        {
                            title: "zoom Out Down",
                            value: "zoomOutDown"
                        },
                        {
                            title: "zoom Out Left",
                            value: "zoomOutLeft"
                        },
                        {
                            title: "zoom Out Right",
                            value: "zoomOutRight"
                        },
                        {
                            title: "zoom Out Up",
                            value: "zoomOutUp"
                        },
                        {
                            type: "separator"
                        },
                        {
                            title: "slide In Down",
                            value: "slideInDown"
                        },
                        {
                            title: "slide In Left",
                            value: "slideInLeft"
                        },
                        {
                            title: "slide In Right",
                            value: "slideInRight"
                        },
                        {
                            title: "slide In Up",
                            value: "slideInUp"
                        },
                        {
                            title: "slide Out Down",
                            value: "slideOutDown"
                        },
                        {
                            title: "slide Out Left",
                            value: "slideOutLeft"
                        },
                        {
                            title: "slide Out Right",
                            value: "slideOutRight"
                        },
                        {
                            title: "slide Out Up",
                            value: "slideOutUp"
                        }],
                    attributeName: "data-wow-animation"
                },
                {
                    label: "Repeat",
                    type: [],
                    activator: false,
                    values: [
                        {
                            title: "infinite",
                            value: "infinite"
                        },
                        {
                            title: "1 time",
                            value: "1"
                        },
                        {
                            title: "1 time",
                            value: "1"
                        },
                        {
                            title: "1 time",
                            value: "1"
                        },
                        {
                            title: "1 time",
                            value: "1"
                        },
                        {
                            title: "1 time",
                            value: "1"
                        },
                        {
                            title: "1 time",
                            value: "1"
                        },
                        {
                            title: "1 time",
                            value: "1"
                        },
                        {
                            title: "1 time",
                            value: "1"
                        },
                        {
                            title: "1 time",
                            value: "1"
                        },
                        {
                            title: "1 time",
                            value: "1"
                        }],
                    attributeName: "data-wow-iteration"
                },
                {
                    label: "Duration (ms)",
                    type: "integer",
                    activator: false,
                    values: 0,
                    attributeName: "data-wow-duration"
                },
                {
                    label: "Delay (ms)",
                    type: "integer",
                    activator: false,
                    values: 0,
                    attributeName: "data-wow-delay"
                },
                {
                    label: "Offset (px)",
                    type: "integer",
                    activator: false,
                    values: 0,
                    attributeName: "data-wow-offset"
                }]
        },
        {
            label: "Tooltips",
            groups: [
                {
                    label: "Tooltip",
                    type: [],
                    activator: true,
                    values: [
                        {
                            title: "enable tooltip",
                            value: "tooltip"
                        }],
                    attributeName: "data-bs-toggle"
                },
                {
                    label: "position",
                    type: [],
                    activator: false,
                    values: [
                        {
                            title: "left",
                            value: "left"
                        },
                        {
                            title: "top",
                            value: "top"
                        },
                        {
                            title: "right",
                            value: "right"
                        },
                        {
                            title: "bottom",
                            value: "bottom"
                        }],
                    attributeName: "data-bs-placement"
                },
                {
                    label: "title",
                    type: "text",
                    activator: false,
                    values: "",
                    attributeName: "title"
                }]
        }],
    privateAttribute:
        {
            row: [
                {
                    label: "Masonry",
                    groups: [
                        {
                            label: "Masonry display",
                            type: [],
                            values: [
                                {
                                    title: "enable masonry",
                                    value: "{\"percentPosition\": true }"
                                }],
                            attributeName: "data-masonry"
                        }],
                    viewName: "div"
                },
                {
                    label: "Light box gallery",
                    groups: [
                        {
                            label: "Light box",
                            type: [],
                            activator: true,
                            values: [
                                {
                                    title: "enable",
                                    value: "true"
                                }],
                            attributeName: "data-light-box-gallery"
                        }],
                    viewName: "div"
                }],
            blockWidget: [
                {
                    label: "Countdown",
                    groups: [
                        {
                            label: "Countdown",
                            type: [],
                            activator: true,
                            values: [
                                {
                                    title: "enable",
                                    value: "true"
                                }],
                            attributeName: "data-countdown"
                        },
                        {
                            label: "End date (YYYY/MM/DD HH:mm:ss)",
                            type: "text",
                            activator: false,
                            values: "0",
                            attributeName: "data-end-date"
                        },
                        {
                            label: "Style",
                            type: [],
                            activator: false,
                            values: [
                                {
                                    title: "style 1",
                                    value: "3"
                                },
                                {
                                    title: "style 3",
                                    value: "5"
                                }],
                            attributeName: "data-box-style"
                        }],
                    viewName: "div"
                }],
            imageBlock: [
                {
                    label: "Light box",
                    groups: [
                        {
                            label: "Enable light box",
                            type: [],
                            values: [
                                {
                                    title: "single image",
                                    value: "image"
                                },
                                {
                                    title: "gallery",
                                    value: "gallery"
                                },
                                {
                                    title: "disable",
                                    value: "false"
                                },
                                {
                                    title: "iframe",
                                    value: "iframe"
                                }],
                            attributeName: "data-light-box"
                        }],
                    viewName: "figure"
                }],
            imageInline: [
                {
                    label: "Light box",
                    groups: [
                        {
                            label: "Enable light box",
                            type: [],
                            values: [
                                {
                                    title: "single image",
                                    value: "image"
                                },
                                {
                                    title: "gallery",
                                    value: "gallery"
                                },
                                {
                                    title: "disable",
                                    value: "false"
                                },
                                {
                                    title: "iframe",
                                    value: "iframe"
                                }],
                            attributeName: "data-light-box"
                        }],
                    viewName: "span"
                }],
            inline: [
                {
                    label: "Button",
                    groups: [
                        {
                            label: "Type",
                            type: [],
                            values: [
                                {
                                    title: "button",
                                    value: "button"
                                },
                                {
                                    title: "submit",
                                    value: "submit"
                                },
                                {
                                    title: "reset",
                                    value: "reset"
                                }],
                            attributeName: "type"
                        }],
                    viewName: "button"
                },
                {
                    label: "Collapse",
                    groups: [
                        {
                            label: "target",
                            type: "text",
                            values: [],
                            attributeName: "data-bs-target"
                        }],
                    viewName: "button"
                },
                {
                    label: "Link",
                    groups: [
                        {
                            label: "URL",
                            type: "",
                            activator: true,
                            attributeName: "href"
                        },
                        {
                            label: "target",
                            type: [],
                            values: [
                                {
                                    title: "new page",
                                    value: "_blank"
                                },
                                {
                                    title: "this page",
                                    value: "_self"
                                }],
                            attributeName: "target"
                        },
                        {
                            label: "open in a lightbox",
                            type: [],
                            values: [
                                {
                                    title: "iframe",
                                    value: "iframe"
                                },
                                {
                                    title: "image",
                                    value: "image"
                                },
                                {
                                    title: "ajax",
                                    value: "ajax"
                                }],
                            attributeName: "data-light-box"
                        }],
                    viewName: "a"
                },
                {
                    label: "Counter",
                    groups: [
                        {
                            label: "Count",
                            type: [],
                            activator: true,
                            values: [
                                {
                                    title: "counter",
                                    value: "true"
                                }],
                            attributeName: "data-counter"
                        },
                        {
                            label: "From",
                            type: "number",
                            activator: false,
                            values: 0,
                            attributeName: "data-from"
                        },
                        {
                            label: "To",
                            type: "number",
                            activator: false,
                            values: 0,
                            attributeName: "data-to"
                        },
                        {
                            label: "Refresh interval (ms)",
                            type: "number",
                            activator: false,
                            values: 0,
                            attributeName: "data-refresh-interval"
                        },
                        {
                            label: "Duration (ms)",
                            type: "number",
                            activator: false,
                            values: 0,
                            attributeName: "data-speed"
                        },
                        {
                            label: "Decimals",
                            type: "number",
                            activator: false,
                            values: 0,
                            attributeName: "data-decimals"
                        }],
                    viewName: "span"
                },
                {
                    label: "Text rotator",
                    groups: [
                        {
                            label: "Rotator",
                            type: [],
                            activator: true,
                            values: [
                                {
                                    title: "enable",
                                    value: "true"
                                }],
                            attributeName: "data-morphext"
                        },
                        {
                            label: "Speed (ms)",
                            type: "number",
                            activator: false,
                            values: 0,
                            attributeName: "data-speed"
                        },
                        {
                            label: "Loop (infinite)",
                            type: "number",
                            activator: false,
                            values: 0,
                            attributeName: "data-loop"
                        },
                        {
                            label: "Separator",
                            type: "text",
                            activator: false,
                            values: "",
                            attributeName: "data-separator"
                        },
                        {
                            label: "Animation",
                            type: [],
                            activator: false,
                            values: [
                                {
                                    title: "bounce",
                                    value: "bounce"
                                },
                                {
                                    title: "flash",
                                    value: "flash"
                                },
                                {
                                    title: "pulse",
                                    value: "pulse"
                                },
                                {
                                    title: "rubber Band",
                                    value: "rubberBand"
                                },
                                {
                                    title: "shake horizontal",
                                    value: "shakeX"
                                },
                                {
                                    title: "shake vertical ",
                                    value: "shakeY"
                                },
                                {
                                    title: "head shake",
                                    value: "headShake"
                                },
                                {
                                    title: "swing",
                                    value: "swing"
                                },
                                {
                                    title: "tada",
                                    value: "tada"
                                },
                                {
                                    title: "wobble",
                                    value: "wobble"
                                },
                                {
                                    title: "jello",
                                    value: "jello"
                                },
                                {
                                    title: "heart Beat",
                                    value: "heartBeat"
                                },
                                {
                                    type: "separator"
                                },
                                {
                                    title: "back In Down",
                                    value: "backInDown"
                                },
                                {
                                    title: "back In Left",
                                    value: "backInLeft"
                                },
                                {
                                    title: "back In Right",
                                    value: "backInRight"
                                },
                                {
                                    title: "back In Up",
                                    value: "backInUp"
                                },
                                {
                                    title: "back Out Down",
                                    value: "backOutDown"
                                },
                                {
                                    title: "back Out Left",
                                    value: "backOutLeft"
                                },
                                {
                                    title: "back Out Right",
                                    value: "backOutRight"
                                },
                                {
                                    title: "back Out Up",
                                    value: "backOutUp"
                                },
                                {
                                    type: "separator"
                                },
                                {
                                    title: "bounce In",
                                    value: "bounceIn"
                                },
                                {
                                    title: "bounce In Down",
                                    value: "bounceInDown"
                                },
                                {
                                    title: "bounce In Left",
                                    value: "bounceInLeft"
                                },
                                {
                                    title: "bounce In Right",
                                    value: "bounceInRight"
                                },
                                {
                                    title: "bounce In Up",
                                    value: "bounceInUp"
                                },
                                {
                                    title: "bounce Out",
                                    value: "bounceOut"
                                },
                                {
                                    title: "bounce Out Down",
                                    value: "bounceOutDown"
                                },
                                {
                                    title: "bounce Out Left",
                                    value: "bounceOutLeft"
                                },
                                {
                                    title: "bounce Out Right",
                                    value: "bounceOutRight"
                                },
                                {
                                    title: "bounce Out Up",
                                    value: "bounceOutUp"
                                },
                                {
                                    type: "separator"
                                },
                                {
                                    title: "fade In",
                                    value: "fadeIn"
                                },
                                {
                                    title: "fade In Down",
                                    value: "fadeInDown"
                                },
                                {
                                    title: "fade In Down Big",
                                    value: "fadeInDownBig"
                                },
                                {
                                    title: "fade In Left",
                                    value: "fadeInLeft"
                                },
                                {
                                    title: "fade In Left Big",
                                    value: "fadeInLeftBig"
                                },
                                {
                                    title: "fade In Right",
                                    value: "fadeInRight"
                                },
                                {
                                    title: "fade In Right Big",
                                    value: "fadeInRightBig"
                                },
                                {
                                    title: "fade In Up",
                                    value: "fadeInUp"
                                },
                                {
                                    title: "fade In Up Big",
                                    value: "fadeInUpBig"
                                },
                                {
                                    title: "fade In Top Left",
                                    value: "fadeInTopLeft"
                                },
                                {
                                    title: "fade In Top Right",
                                    value: "fadeInTopRight"
                                },
                                {
                                    title: "fade In Bottom Left",
                                    value: "fadeInBottomLeft"
                                },
                                {
                                    title: "fade In Bottom Right",
                                    value: "fadeInBottomRight"
                                },
                                {
                                    title: "fade Out",
                                    value: "fadeOut"
                                },
                                {
                                    title: "fade Out Down",
                                    value: "fadeOutDown"
                                },
                                {
                                    title: "fade Out Down Big",
                                    value: "fadeOutDownBig"
                                },
                                {
                                    title: "fade Out Left",
                                    value: "fadeOutLeft"
                                },
                                {
                                    title: "fade Out Left Big",
                                    value: "fadeOutLeftBig"
                                },
                                {
                                    title: "fade Out Right",
                                    value: "fadeOutRight"
                                },
                                {
                                    title: "fade Out Right Big",
                                    value: "fadeOutRightBig"
                                },
                                {
                                    title: "fade Out Up",
                                    value: "fadeOutUp"
                                },
                                {
                                    title: "fade Out Up Big",
                                    value: "fadeOutUpBig"
                                },
                                {
                                    title: "fade Out Top Left",
                                    value: "fadeOutTopLeft"
                                },
                                {
                                    title: "fade Out Top Right",
                                    value: "fadeOutTopRight"
                                },
                                {
                                    title: "fade Out Bottom Right",
                                    value: "fadeOutBottomRight"
                                },
                                {
                                    title: "fade Out Bottom Left",
                                    value: "fadeOutBottomLeft"
                                },
                                {
                                    type: "separator"
                                },
                                {
                                    title: "flip",
                                    value: "flip"
                                },
                                {
                                    title: "flip In X",
                                    value: "flipInX"
                                },
                                {
                                    title: "flip In Y",
                                    value: "flipInY"
                                },
                                {
                                    title: "flip Out X",
                                    value: "flipOutX"
                                },
                                {
                                    title: "flip Out Y",
                                    value: "flipOutY"
                                },
                                {
                                    type: "separator"
                                },
                                {
                                    title: "light Speed In Right",
                                    value: "lightSpeedInRight"
                                },
                                {
                                    title: "light Speed In Left",
                                    value: "lightSpeedInLeft"
                                },
                                {
                                    title: "light Speed Out Right",
                                    value: "lightSpeedOutRight"
                                },
                                {
                                    title: "light Speed Out Left",
                                    value: "lightSpeedOutLeft"
                                },
                                {
                                    type: "separator"
                                },
                                {
                                    title: "rotate In",
                                    value: "rotateIn"
                                },
                                {
                                    title: "rotate In Down Left",
                                    value: "rotateInDownLeft"
                                },
                                {
                                    title: "rotate In Down Right",
                                    value: "rotateInDownRight"
                                },
                                {
                                    title: "rotate In Up Left",
                                    value: "rotateInUpLeft"
                                },
                                {
                                    title: "rotate In Up Right",
                                    value: "rotateInUpRight"
                                },
                                {
                                    title: "rotate Out",
                                    value: "rotateOut"
                                },
                                {
                                    title: "rotate Out Down Left",
                                    value: "rotateOutDownLeft"
                                },
                                {
                                    title: "rotate Out Down Right",
                                    value: "rotateOutDownRight"
                                },
                                {
                                    title: "rotate Out Up Left",
                                    value: "rotateOutUpLeft"
                                },
                                {
                                    title: "rotate Out Up Right",
                                    value: "rotateOutUpRight"
                                },
                                {
                                    type: "separator"
                                },
                                {
                                    title: "hinge",
                                    value: "hinge"
                                },
                                {
                                    title: "jack In The Box",
                                    value: "jackInTheBox"
                                },
                                {
                                    title: "roll In",
                                    value: "rollIn"
                                },
                                {
                                    title: "roll Out",
                                    value: "rollOut"
                                },
                                {
                                    type: "separator"
                                },
                                {
                                    title: "zoom In",
                                    value: "zoomIn"
                                },
                                {
                                    title: "zoom In Down",
                                    value: "zoomInDown"
                                },
                                {
                                    title: "zoom In Left",
                                    value: "zoomInLeft"
                                },
                                {
                                    title: "zoom In Right",
                                    value: "zoomInRight"
                                },
                                {
                                    title: "zoom In Up",
                                    value: "zoomInUp"
                                },
                                {
                                    title: "zoom Out",
                                    value: "zoomOut"
                                },
                                {
                                    title: "zoom Out Down",
                                    value: "zoomOutDown"
                                },
                                {
                                    title: "zoom Out Left",
                                    value: "zoomOutLeft"
                                },
                                {
                                    title: "zoom Out Right",
                                    value: "zoomOutRight"
                                },
                                {
                                    title: "zoom Out Up",
                                    value: "zoomOutUp"
                                },
                                {
                                    type: "separator"
                                },
                                {
                                    title: "slide In Down",
                                    value: "slideInDown"
                                },
                                {
                                    title: "slide In Left",
                                    value: "slideInLeft"
                                },
                                {
                                    title: "slide In Right",
                                    value: "slideInRight"
                                },
                                {
                                    title: "slide In Up",
                                    value: "slideInUp"
                                },
                                {
                                    title: "slide Out Down",
                                    value: "slideOutDown"
                                },
                                {
                                    title: "slide Out Left",
                                    value: "slideOutLeft"
                                },
                                {
                                    title: "slide Out Right",
                                    value: "slideOutRight"
                                },
                                {
                                    title: "slide Out Up",
                                    value: "slideOutUp"
                                }],
                            attributeName: "data-morphext-animation"
                        }],
                    viewName: "span"
                }]
        },
    elementsToolbar: [
        {
            title: "blocks",
            elements: [
                {
                    title: "section",
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-layers' viewBox='0 0 16 16'><path d='M8.235 1.559a.5.5 0 0 0-.47 0l-7.5 4a.5.5 0 0 0 0 .882L3.188 8 .264 9.559a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882L12.813 8l2.922-1.559a.5.5 0 0 0 0-.882l-7.5-4zm3.515 7.008L14.438 10 8 13.433 1.562 10 4.25 8.567l3.515 1.874a.5.5 0 0 0 .47 0l3.515-1.874zM8 9.433 1.562 6 8 2.567 14.438 6 8 9.433z'></path></svg>",
                    modelName: "section",
                    viewDefinition: "<section data-block-type='section'></section>",
                    description: "<p>Sections are principaly the first child of root</p><hr><p>To add a section in the page, click this button and drag it around </p>",
                    selector: "[data-block-type=section]",
                    template: [
                        {
                            title: "how to",
                            url: "/pofo/template/?q=howto"
                        },
                        {
                            title: "basic",
                            url: "/pofo/template/?q=section"
                        },
                        {
                            title: "page title",
                            url: "/pofo/template/?q=section"
                        },
                        {
                            title: "background image",
                            url: "/pofo/template/?q=section"
                        },
                        {
                            title: "background video",
                            url: "/pofo/template/?q=section"
                        },
                        {
                            title: "call to action",
                            url: "/pofo/template/?q=section"
                        },
                        {
                            title: "featured image",
                            url: "/pofo/template/?q=section"
                        },
                        {
                            title: "references",
                            url: "/pofo/template/?q=section"
                        },
                        {
                            title: "icon boxes",
                            url: "/pofo/template/?q=section"
                        },
                        {
                            title: "card",
                            url: "/pofo/template/?q=section"
                        },
                        {
                            title: "about me",
                            url: "/pofo/template/?q=section"
                        },
                        {
                            title: "about us",
                            url: "/pofo/template/?q=section"
                        },
                        {
                            title: "portfolio",
                            url: "/pofo/template/?q=section"
                        },
                        {
                            title: "clients & partner",
                            url: "/pofo/template/?q=section"
                        },
                        {
                            title: "team member",
                            url: "/pofo/template/?q=section"
                        },
                        {
                            title: "pricing table",
                            url: "/pofo/template/?q=section"
                        },
                        {
                            title: "pricing list",
                            url: "/pofo/template/?q=section"
                        },
                        {
                            title: "schedule",
                            url: "/pofo/template/?q=section"
                        },
                        {
                            title: "contact",
                            url: "/pofo/template/?q=section"
                        }]
                },
                {
                    title: "container",
                    icon: "<?xml version='1.0' encoding='utf-8'?><!-- Generator: Adobe Illustrator 23.0.3, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version='1.1' id='Calque_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px'\t viewBox='0 0 20 20' style='enable-background:new 0 0 20 20;' xml:space='preserve'><path d='M3.2,0C3,0,2.8,0,2.6,0.1l0.2,1.2c0.1,0,0.2,0,0.4,0h0.6V0H3.2z M6.3,0H5v1.3h1.3V0z M8.8,0H7.5v1.3h1.3V0z M10,0H8.8v1.3\tH10V0z M12.5,0h-1.3v1.3h1.3V0z M15,0h-1.3v1.3H15V0z M16.8,0h-0.6v1.3h0.6c0.1,0,0.2,0,0.4,0l0.2-1.2C17.2,0,17,0,16.8,0z\t M19.3,1.6C19,1.3,18.7,1,18.4,0.8l-0.7,1c0.2,0.1,0.4,0.3,0.5,0.5L19.3,1.6L19.3,1.6z M1.2,0.8C0.8,1,0.5,1.3,0.3,1.6l1,0.7\tC1.5,2.1,1.7,2,1.9,1.8L1.2,0.8L1.2,0.8z M20,3.2c0-0.2,0-0.4-0.1-0.6l-1.2,0.2c0,0.1,0,0.2,0,0.4v0.6H20V3.2z M0.1,2.6\tC0,2.8,0,3,0,3.2v0.6h1.3V3.2c0-0.1,0-0.2,0-0.4C1.3,2.8,0.1,2.6,0.1,2.6z M0,5v1.2h1.3V5C1.3,5,0,5,0,5z M20,6.3V5h-1.3v1.3H20z\t M0,7.5v1.3h1.3V7.5H0z M20,8.8V7.5h-1.3v1.3H20z M0,10v1.3h1.3V10C1.3,10,0,10,0,10z M18.8,11.3H20V10h-1.3V11.3z M0,13.8V15h1.3\tv-1.3H0z M20,13.8v-1.3h-1.3v1.3H20z M0,13.8V15h1.3v-1.3H0z M20,15v-1.3h-1.3V15H20z M0,16.3v0.6c0,0.2,0,0.4,0.1,0.6l1.2-0.2\tc0-0.1,0-0.2,0-0.4v-0.6H0z M20,16.8v-0.6h-1.3v0.6c0,0.1,0,0.2,0,0.4l1.2,0.2C20,17.2,20,17,20,16.8z M0.3,18.9\tc0.2,0.3,0.5,0.6,0.9,0.9l0.7-1c-0.2-0.1-0.4-0.3-0.5-0.5L0.3,18.9L0.3,18.9z M18.4,19.7c0.3-0.2,0.6-0.5,0.9-0.9l-1-0.7\tc-0.1,0.2-0.3,0.4-0.5,0.5L18.4,19.7L18.4,19.7z M2.6,19.9C2.8,20,3,20,3.2,20h0.6v-1.3H3.2c-0.1,0-0.2,0-0.4,0\tC2.8,18.7,2.6,19.9,2.6,19.9z M16.8,20c0.2,0,0.4,0,0.6-0.1l-0.2-1.2c-0.1,0-0.2,0-0.4,0h-0.6V20H16.8z M5,20h1.2v-1.3H5\tC5,18.8,5,20,5,20z M8.8,20H10v-1.3H8.8V20z M8.8,18.8V20H10v-1.3H8.8z M11.3,20h1.3v-1.3h-1.3V20z M13.8,20H15v-1.3h-1.3V20z'/><path d='M4.2,4.1v4h11.7v-4H4.2z M3.3,8.1v-4c0-0.4,0.4-0.8,0.8-0.8h11.7c0.5,0,0.8,0.4,0.8,0.8v4c0,0.4-0.4,0.8-0.8,0.8H4.2\tC3.7,8.9,3.3,8.5,3.3,8.1z'/><path d='M4.2,11.9v4h11.7v-4H4.2z M3.3,15.9v-4c0-0.4,0.4-0.8,0.8-0.8h11.7c0.5,0,0.8,0.4,0.8,0.8v4c0,0.4-0.4,0.8-0.8,0.8H4.2\tC3.7,16.7,3.3,16.3,3.3,15.9z'/></svg>",
                    modelName: "container",
                    viewDefinition: "<div data-block-type='container' class='container'></div>",
                    description: "<div data-block-type='container' class='container'></div>",
                    selector: "[data-block-type=container]",
                    template: [
                        {
                            title: "basic",
                            url: "/pofo/template/?q=container"
                        }]
                },
                {
                    title: "row",
                    icon: "<?xml version='1.0' encoding='utf-8'?><!-- Generator: Adobe Illustrator 23.0.3, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version='1.1' id='Calque_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px'\t viewBox='0 0 20 20' style='enable-background:new 0 0 20 20;' xml:space='preserve'><path d='M2.1,12.3v5.6h15.8v-5.6H2.1z M1,17.9v-5.6c0-0.6,0.5-1.1,1.1-1.1h15.8c0.6,0,1.1,0.5,1.1,1.1v5.6c0,0.6-0.5,1.1-1.1,1.1\tH2.1C1.5,19,1,18.5,1,17.9z M2.1,2.3v5.6h15.8V2.3H2.1z M1,7.9V2.3c0-0.6,0.5-1.1,1.1-1.1h15.8c0.6,0,1.1,0.5,1.1,1.1v5.6\tC19,8.5,18.5,9,17.9,9H2.1C1.5,9,1,8.5,1,7.9z'/></svg>",
                    modelName: "row",
                    viewDefinition: "<div data-block-type='row' class='row'></div>",
                    description: "<div data-block-type='row' class='row'></div>",
                    selector: "[data-block-type=row]",
                    template: [
                        {
                            title: "1 column",
                            url: "/pofo/template/?q=row"
                        },
                        {
                            title: "2 column",
                            url: "/pofo/template/?q=row"
                        },
                        {
                            title: "3 column",
                            url: "/pofo/template/?q=row"
                        },
                        {
                            title: "4 column",
                            url: "/pofo/template/?q=row"
                        },
                        {
                            title: "6 column",
                            url: "/pofo/template/?q=row"
                        }]
                },
                {
                    title: "column",
                    icon: "<?xml version='1.0' encoding='utf-8'?><!-- Generator: Adobe Illustrator 23.0.3, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version='1.1' id='Calque_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px'\t viewBox='0 0 20 20' style='enable-background:new 0 0 20 20;' xml:space='preserve'><g>\t<path d='M2.3,19C1.6,19,1,18.5,1,17.9V2.1C1,1.5,1.6,1,2.3,1h15.4C18.4,1,19,1.5,19,2.1v15.8c0,0.6-0.6,1.1-1.3,1.1H2.3z M2.3,9.4\t\th10.3V2.1H2.3V9.4z M13.9,9.4h3.9V2.1h-3.9V9.4z M2.3,10.6v7.3h3.9v-7.3H2.3z M17.7,17.9v-7.3H7.4v7.3H17.7z'/></g></svg>",
                    modelName: "column",
                    viewDefinition: "<div data-block-type='column' class='col'></div>",
                    description: "<div data-block-type='column' class='col'></div>",
                    selector: "[data-block-type=column]",
                    template: [
                        {
                            title: "basic",
                            url: "/pofo/template/?q=column"
                        },
                        {
                            title: "card",
                            url: "/pofo/template/?q=card"
                        },
                        {
                            title: "reference",
                            url: "/pofo/template/?q=column"
                        },
                        {
                            title: "icon box",
                            url: "/pofo/template/?q=column"
                        },
                        {
                            title: "team member",
                            url: "/pofo/template/?q=column"
                        },
                        {
                            title: "portfolio",
                            url: "/pofo/template/?q=column"
                        },
                        {
                            title: "pricing",
                            url: "/pofo/template/?q=column"
                        },
                        {
                            title: "information",
                            url: "/pofo/template/?q=column"
                        },
                        {
                            title: "schedule",
                            url: "/pofo/template/?q=column"
                        }]
                },
                {
                    title: "block",
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-collection' viewBox='0 0 16 16'><path d='M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z'/>\n</svg>",
                    modelName: "block",
                    viewDefinition: "<div data-block-type='block'></div>",
                    description: "<div data-block-type='block'></div>",
                    selector: "[data-block-type=block]",
                    template: [
                        {
                            title: "all",
                            url: "/pofo/template/?q=elements"
                        },
                        {
                            title: "background overlays",
                            url: "/pofo/template/?q=inline"
                        }]
                }, "|",
                {
                    title: "content",
                    icon: "<?xml version='1.0' encoding='utf-8'?><!-- Generator: Adobe Illustrator 23.0.3, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version='1.1' id='Calque_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px'\t viewBox='0 0 20 20' style='enable-background:new 0 0 20 20;' xml:space='preserve'><g>\t<path d='M17.9,3.3v13.5c0,0.4-0.3,0.8-0.6,0.8H2.7c-0.3,0-0.6-0.3-0.6-0.8V3.3c0-0.4,0.3-0.8,0.6-0.8h14.6\t\tC17.6,2.5,17.9,2.8,17.9,3.3z M1,3.3v13.5C1,18,1.8,19,2.7,19h14.6c0.9,0,1.7-1,1.7-2.3V3.3C19,2,18.2,1,17.3,1H2.7\t\tC1.8,1,1,2,1,3.3z'/>\t<path d='M4.4,6c0-0.4,0.3-0.8,0.6-0.8h10.1c0.3,0,0.6,0.3,0.6,0.8s-0.3,0.8-0.6,0.8H5C4.7,6.8,4.4,6.4,4.4,6z M4.4,9.5\t\tc0-0.4,0.3-0.8,0.6-0.8h10.1c0.3,0,0.6,0.3,0.6,0.8c0,0.4-0.3,0.8-0.6,0.8H5C4.7,10.3,4.4,9.9,4.4,9.5z M4.4,13\t\tc0-0.4,0.3-0.8,0.6-0.8h6.8c0.3,0,0.6,0.3,0.6,0.8s-0.3,0.8-0.6,0.8H5C4.7,13.8,4.4,13.4,4.4,13z'/></g></svg>",
                    modelName: "content",
                    viewDefinition: "<div data-block-type='content' class=''><div data-block-type='text-container'></div></div>",
                    description: "<div data-block-type='content' class=''><div data-block-type='text-container'></div></div>",
                    selector: "[data-block-type=content]"
                }]
        },
        {
            title: "template",
            elements: [
                {
                    title: "gallery images",
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 41 34.19'><g ><g><path d='M.25,10A.81.81,0,0,1,0,9.39V.86A.81.81,0,0,1,.25.27.79.79,0,0,1,.86,0H9.39A.79.79,0,0,1,10,.27a.81.81,0,0,1,.25.59V9.39a.85.85,0,0,1-.86.86H.86A.81.81,0,0,1,.25,10Zm0,12A.83.83,0,0,1,0,21.36V12.83a.81.81,0,0,1,.25-.61A.81.81,0,0,1,.86,12H16.24a.84.84,0,0,1,.59.25.79.79,0,0,1,.27.61v8.53a.81.81,0,0,1-.27.62.88.88,0,0,1-.59.24H.86A.84.84,0,0,1,.25,22Zm8,2.21a.77.77,0,0,1,.25.57v8.57a.85.85,0,0,1-.25.6.76.76,0,0,1-.57.26H.86a.82.82,0,0,1-.61-.26.85.85,0,0,1-.25-.6V24.76a.77.77,0,0,1,.25-.57.85.85,0,0,1,.61-.25H7.71A.79.79,0,0,1,8.28,24.19ZM1.72,8.57H8.53V1.72H1.72Zm0,11.93H15.38V13.69H1.72Zm5.13,5.13H1.72v6.84H6.85Zm18.53-1.44a.81.81,0,0,1,.25.57v8.57a.89.89,0,0,1-.25.6.84.84,0,0,1-.62.26H11.11a.82.82,0,0,1-.61-.26.85.85,0,0,1-.25-.6V24.76a.77.77,0,0,1,.25-.57.85.85,0,0,1,.61-.25H24.76A.87.87,0,0,1,25.38,24.19ZM12.22,10A.81.81,0,0,1,12,9.39V.86a.81.81,0,0,1,.25-.59A.79.79,0,0,1,12.83,0H28.21a.74.74,0,0,1,.57.27A.81.81,0,0,1,29,.86V9.39a.81.81,0,0,1-.25.61.75.75,0,0,1-.57.25H12.83A.81.81,0,0,1,12.22,10ZM23.9,25.63H12v6.84H23.9ZM13.65,8.57h13.7V1.72H13.65Zm15.13,3.65a.81.81,0,0,1,.25.61v8.53a.83.83,0,0,1-.25.62.78.78,0,0,1-.57.24H19.64A.88.88,0,0,1,19,22a.84.84,0,0,1-.26-.62V12.83a.82.82,0,0,1,.26-.61.85.85,0,0,1,.6-.25h8.57A.75.75,0,0,1,28.78,12.22Zm-1.43,1.47H20.5V20.5h6.85Zm13.4,10.5a.77.77,0,0,1,.25.57v8.57a.85.85,0,0,1-.25.6.82.82,0,0,1-.61.26H28.21a.84.84,0,0,1-.62-.26.88.88,0,0,1-.24-.6V24.76a.8.8,0,0,1,.24-.57.87.87,0,0,1,.62-.25H40.14A.85.85,0,0,1,40.75,24.19Zm-1.47,1.44H29v6.84H39.28ZM40.75.27A.81.81,0,0,1,41,.86V9.39a.85.85,0,0,1-.86.86H31.61a.85.85,0,0,1-.86-.86V.86A.81.81,0,0,1,31,.27.79.79,0,0,1,31.61,0h8.53A.79.79,0,0,1,40.75.27Zm0,12a.81.81,0,0,1,.25.61v8.53a.84.84,0,0,1-.86.86H31.61a.84.84,0,0,1-.86-.86V12.83a.85.85,0,0,1,.86-.86h8.53A.81.81,0,0,1,40.75,12.22ZM39.28,1.72H32.47V8.57h6.81Zm0,12H32.47V20.5h6.81Z'/></g></g>\n</svg>\n",
                    modelName: "row",
                    viewDefinition: "<div class='row' data-block-type='row' data-masonry='{\"percentPosition\": true }'>",
                    description: "<figure><img src='http://placehold.it/800?text=%20' alt=''/></figure>",
                    selector: "[data-block-type=row]",
                    template: [
                        {
                            title: "all",
                            url: "/pofo/template/?q=elements"
                        },
                        {
                            title: "button",
                            url: "/pofo/template/?q=inline"
                        }]
                },
                {
                    title: "divider",
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 39.28 39.28' fill='currentColor'><g ><g ><path d='M.25,15.13A.83.83,0,0,1,0,14.51a.81.81,0,0,1,.25-.61.81.81,0,0,1,.61-.25H38.42a.79.79,0,0,1,.61.27.83.83,0,0,1,0,1.19.79.79,0,0,1-.61.27H.86A.85.85,0,0,1,.25,15.13Zm38.78,9a.83.83,0,0,1,0,1.19.79.79,0,0,1-.61.27H.86a.85.85,0,0,1-.61-.25A.83.83,0,0,1,0,24.76a.81.81,0,0,1,.25-.61.81.81,0,0,1,.61-.25H38.42A.79.79,0,0,1,39,24.17ZM13.74,8a.83.83,0,0,1,.08-.87L18.94.33a.91.91,0,0,1,1.4,0l5.12,6.84a.73.73,0,0,1,.08.87.88.88,0,0,1-.78.49H14.51A.88.88,0,0,1,13.74,8ZM25.54,31.2a.85.85,0,0,1,.06.45,1,1,0,0,1-.14.45L20.34,39a.91.91,0,0,1-1.4,0L13.82,32.1a1.09,1.09,0,0,1-.15-.45,1,1,0,0,1,.07-.45.81.81,0,0,1,.77-.45H24.76A.82.82,0,0,1,25.54,31.2ZM16.24,6.81H23l-3.4-4.56ZM23,32.43h-6.8L19.64,37Z'/></g></g>\n</svg>\n",
                    modelName: "row",
                    viewDefinition: "<figure><img src='http://placehold.it/800?text=%20' alt=''/></figure>",
                    description: "<figure><img src='http://placehold.it/800?text=%20' alt=''/></figure>",
                    selector: "[data-block-type=inline]",
                    template: [
                        {
                            title: "basic",
                            url: "/pofo/template/?q=elements"
                        },
                        {
                            title: "shape divider",
                            url: "/pofo/template/?q=inline"
                        }]
                },
                {
                    title: "modal",
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 60 60' height='512' viewBox='0 0 60 60' width='512'><path d='m7 8h-6c-.552 0-1-.448-1-1v-6c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v6c0 .552-.448 1-1 1zm-5-2h4v-4h-4z'/><path d='m59 8h-6c-.552 0-1-.448-1-1v-6c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v6c0 .552-.448 1-1 1zm-5-2h4v-4h-4z'/><path d='m59 60h-6c-.552 0-1-.448-1-1v-6c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v6c0 .552-.448 1-1 1zm-5-2h4v-4h-4z'/><path d='m29 40h-28c-.552 0-1-.448-1-1v-8c0-.552.448-1 1-1h28c.552 0 1 .448 1 1v8c0 .552-.448 1-1 1zm-27-2h26v-6h-26z'/><path d='m6 36h-1c-.552 0-1-.448-1-1s.448-1 1-1h1c.552 0 1 .448 1 1s-.448 1-1 1z'/><path d='m11 36h-1c-.552 0-1-.448-1-1s.448-1 1-1h1c.552 0 1 .448 1 1s-.448 1-1 1z'/><path d='m16 36h-1c-.552 0-1-.448-1-1s.448-1 1-1h1c.552 0 1 .448 1 1s-.448 1-1 1z'/><path d='m29 60h-28c-.552 0-1-.448-1-1v-20c0-.552.448-1 1-1h28c.552 0 1 .448 1 1v20c0 .552-.448 1-1 1zm-27-2h26v-18h-26z'/><path d='m53 57h-24c-.552 0-1-.448-1-1v-24h-24c-.552 0-1-.448-1-1v-24c0-.552.448-1 1-1h2v-2c0-.552.448-1 1-1h46c.552 0 1 .448 1 1v2h2c.552 0 1 .448 1 1v46c0 .552-.448 1-1 1h-2v2c0 .552-.448 1-1 1zm-23-2h22v-2c0-.552.448-1 1-1h2v-44h-2c-.552 0-1-.448-1-1v-2h-44v2c0 .552-.448 1-1 1h-2v22h24c.552 0 1 .448 1 1z'/><path d='m18 28c-.552 0-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10c0 .552-.448 1-1 1z'/><path d='m15 21c-.256 0-.512-.098-.707-.293-.391-.391-.391-1.023 0-1.414l3-3c.39-.391 1.024-.391 1.414 0 .391.391.391 1.023 0 1.414l-3 3c-.195.195-.451.293-.707.293z'/><path d='m21 21c-.256 0-.512-.098-.707-.293l-3-3c-.391-.391-.391-1.023 0-1.414.39-.391 1.024-.391 1.414 0l3 3c.391.391.391 1.023 0 1.414-.195.195-.451.293-.707.293z'/><path d='m43 44h-10c-.552 0-1-.448-1-1s.448-1 1-1h10c.552 0 1 .448 1 1s-.448 1-1 1z'/><path d='m43 44c-.256 0-.512-.098-.707-.293l-3-3c-.391-.391-.391-1.023 0-1.414.39-.391 1.024-.391 1.414 0l3 3c.391.391.391 1.023 0 1.414-.195.195-.451.293-.707.293z'/><path d='m40 47c-.256 0-.512-.098-.707-.293-.391-.391-.391-1.023 0-1.414l3-3c.39-.391 1.024-.391 1.414 0 .391.391.391 1.023 0 1.414l-3 3c-.195.195-.451.293-.707.293z'/><path d='m33 29c-.256 0-.512-.098-.707-.293-.391-.391-.391-1.023 0-1.414l7-7c.39-.391 1.024-.391 1.414 0 .391.391.391 1.023 0 1.414l-7 7c-.195.195-.451.293-.707.293z'/><path d='m40 22h-5c-.552 0-1-.448-1-1s.448-1 1-1h5c.552 0 1 .448 1 1s-.448 1-1 1z'/><path d='m40 27c-.552 0-1-.448-1-1v-5c0-.552.448-1 1-1s1 .448 1 1v5c0 .552-.448 1-1 1z'/></svg>",
                    modelName: "block",
                    viewDefinition: "<div data-block-type='block' class='position-absolute background-overlay bg-theme'></div>",
                    description: "",
                    selector: "[data-block-type=inline]",
                    template: [
                        {
                            title: "all",
                            url: "/pofo/template/?q=elements"
                        },
                        {
                            title: "button",
                            url: "/pofo/template/?q=inline"
                        }]
                },
                {
                    title: "page title",
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 41 39.28' fill='currentColor'><g><g><path d='M41,35a4.21,4.21,0,0,1-.57,2.14,4.37,4.37,0,0,1-1.56,1.55,4.11,4.11,0,0,1-2.13.58H4.26a4.11,4.11,0,0,1-2.13-.58A4.37,4.37,0,0,1,.57,37.15,4.21,4.21,0,0,1,0,35V4.26A4.2,4.2,0,0,1,.57,2.13,4.48,4.48,0,0,1,2.13.57,4.2,4.2,0,0,1,4.26,0H36.74a4.2,4.2,0,0,1,2.13.57,4.48,4.48,0,0,1,1.56,1.56A4.2,4.2,0,0,1,41,4.26ZM39.28,6.81V4.26a2.53,2.53,0,0,0-.74-1.82,2.4,2.4,0,0,0-1.8-.76H4.26a2.4,2.4,0,0,0-1.8.76,2.53,2.53,0,0,0-.74,1.82V6.81Zm0,1.72H1.72V35a2.44,2.44,0,0,0,.76,1.79,2.47,2.47,0,0,0,1.78.76H36.74a2.43,2.43,0,0,0,1.8-.76A2.5,2.5,0,0,0,39.28,35ZM5.13,4.26a.89.89,0,0,1-.25.6.81.81,0,0,1-.62.27.79.79,0,0,1-.61-.27.85.85,0,0,1-.25-.6.83.83,0,0,1,.27-.59.81.81,0,0,1,.59-.27.89.89,0,0,1,.6.25A.79.79,0,0,1,5.13,4.26ZM6,34.15a.82.82,0,0,1-.86-.86v-3.4A.82.82,0,0,1,6,29h3.4a.84.84,0,0,1,.86.86v3.4a.84.84,0,0,1-.86.86ZM8.53,4.26a.85.85,0,0,1-.25.6.74.74,0,0,1-.57.27.83.83,0,0,1-.6-.27.86.86,0,0,1-.26-.6.88.88,0,0,1,.24-.59.81.81,0,0,1,.62-.27.78.78,0,0,1,.59.25A.87.87,0,0,1,8.53,4.26ZM6.85,32.43H8.53V30.75H6.85ZM12,4.26a.88.88,0,0,1-.24.6.81.81,0,0,1-.62.27.79.79,0,0,1-.61-.27.83.83,0,0,1,0-1.19.79.79,0,0,1,.61-.27.87.87,0,0,1,.62.25A.84.84,0,0,1,12,4.26Zm.86,26.49a.79.79,0,0,1-.61-.27.81.81,0,0,1-.25-.59.85.85,0,0,1,.25-.6.82.82,0,0,1,.61-.26H18a.78.78,0,0,1,.57.24.83.83,0,0,1,.25.62.81.81,0,0,1-.25.61.75.75,0,0,1-.57.25Zm0,3.4a.84.84,0,0,1-.86-.86.85.85,0,0,1,.86-.86H18a.75.75,0,0,1,.57.25.81.81,0,0,1,.25.61.83.83,0,0,1-.25.62.78.78,0,0,1-.57.24Zm6.81-12V13.65h-3.4v.9a.87.87,0,1,1-1.73,0V12.79a.85.85,0,0,1,.25-.61.81.81,0,0,1,.62-.25H25.63a.81.81,0,0,1,.61.25.85.85,0,0,1,.25.61v1.76a.87.87,0,1,1-1.73,0v-.9h-3.4v8.53h1.72a.79.79,0,0,1,.58.25.84.84,0,0,1,.24.61.86.86,0,0,1-.24.62.82.82,0,0,1-.58.24H18A.82.82,0,0,1,17.1,23a.84.84,0,0,1,.86-.86Zm3.44,12a.84.84,0,0,1-.86-.86v-3.4a.84.84,0,0,1,.86-.86h3.41a.84.84,0,0,1,.86.86v3.4a.84.84,0,0,1-.86.86Zm.82-1.72h1.73V30.75H23.9Zm6-1.68a.83.83,0,0,1-.6-.27.82.82,0,0,1-.26-.59.89.89,0,0,1,.86-.86H35a.84.84,0,0,1,.87.86.85.85,0,0,1-.25.61.83.83,0,0,1-.62.25Zm0,3.4a.88.88,0,0,1-.6-.24.84.84,0,0,1-.26-.62.82.82,0,0,1,.26-.61.85.85,0,0,1,.6-.25H35a.83.83,0,0,1,.62.25.85.85,0,0,1,.25.61.84.84,0,0,1-.87.86Z'/></g></g></svg>",
                    modelName: "section",
                    viewDefinition: "<div data-block-type='column' class='col'><div data-block-type='content'><div data-block-type='text-container'></div></div></div>",
                    description: "<div data-block-type='column' class='col'><div data-block-type='content'><div data-block-type='text-container'></div></div></div>",
                    selector: "[data-block-type=inline]",
                    template: [
                        {
                            title: "all",
                            url: "/pofo/template/?q=elements"
                        },
                        {
                            title: "button",
                            url: "/pofo/template/?q=inline"
                        }]
                },
                {
                    title: "price list",
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 34.2 41'><g><g><path d='M23.68,36.14a.81.81,0,0,1,0,1.19.83.83,0,0,1-.6.27H.86a.79.79,0,0,1-.59-.27A.83.83,0,0,1,0,36.74V11.11a.8.8,0,0,1,.08-.33l.08-.16q.09-.09.09-.12L10.5.25,10.87,0a.9.9,0,0,1,.24,0H29.93a.75.75,0,0,1,.57.25.79.79,0,0,1,.25.61v23.9a.9.9,0,0,1-.23.62.77.77,0,0,1-.59.25.84.84,0,0,1-.86-.87v-23H12v9.39a.88.88,0,0,1-.24.6.84.84,0,0,1-.62.26H1.72V35.88H23.08A.82.82,0,0,1,23.68,36.14ZM10.25,10.25V2.91L3,10.25Zm-.74,5.86a2.47,2.47,0,0,1,.74,1.81,2.51,2.51,0,0,1-.74,1.82,2.4,2.4,0,0,1-1.8.76,2.58,2.58,0,0,1-2.58-2.58,2.45,2.45,0,0,1,.75-1.81,2.54,2.54,0,0,1,1.83-.73A2.44,2.44,0,0,1,9.51,16.11Zm0,6.85a2.45,2.45,0,0,1,.74,1.8,2.55,2.55,0,0,1-.74,1.83,2.43,2.43,0,0,1-1.8.76,2.58,2.58,0,0,1-2.58-2.59A2.42,2.42,0,0,1,5.88,23a2.55,2.55,0,0,1,1.83-.74A2.45,2.45,0,0,1,9.51,23Zm0,6.83a2.45,2.45,0,0,1,.76,1.82,2.49,2.49,0,0,1-.74,1.81,2.44,2.44,0,0,1-1.8.73,2.54,2.54,0,0,1-1.83-.73,2.57,2.57,0,0,1,0-3.63A2.49,2.49,0,0,1,7.71,29,2.41,2.41,0,0,1,9.49,29.79ZM8.3,18.51a.81.81,0,0,0,.27-.59.79.79,0,0,0-.25-.58.84.84,0,0,0-.61-.24.89.89,0,0,0-.62.22.78.78,0,0,0-.24.6.84.84,0,0,0,.86.86A.81.81,0,0,0,8.3,18.51Zm0,6.85a.81.81,0,0,0,0-1.19.79.79,0,0,0-.61-.27.84.84,0,0,0-.86.86.84.84,0,0,0,.86.87A.81.81,0,0,0,8.3,25.36Zm0,6.87a.81.81,0,0,0,.27-.62A.79.79,0,0,0,8.32,31a.86.86,0,0,0-1.23,0,.84.84,0,0,0-.24.59.88.88,0,0,0,.24.6.84.84,0,0,0,.62.26A.86.86,0,0,0,8.3,32.23ZM24.81,17.1a.82.82,0,0,1,.57.22.79.79,0,0,1,.25.6.85.85,0,0,1-.25.61.77.77,0,0,1-.57.25H14.56a.8.8,0,0,1-.62-.27.87.87,0,0,1-.25-.59.83.83,0,0,1,.25-.58.84.84,0,0,1,.62-.24Zm.57,7a.85.85,0,0,1,.25.61.87.87,0,0,1-.25.62.81.81,0,0,1-.57.25H14.56a.8.8,0,0,1-.62-.27.89.89,0,0,1-.25-.6.87.87,0,0,1,.25-.59.8.8,0,0,1,.62-.27H24.81A.77.77,0,0,1,25.38,24.15ZM23.68,31a.82.82,0,0,1,.26.59.89.89,0,0,1-.86.86H14.56a.84.84,0,0,1-.62-.24.87.87,0,0,1-.25-.62.83.83,0,0,1,.25-.61.81.81,0,0,1,.62-.25h8.52A.83.83,0,0,1,23.68,31Zm9.55,7.19a4.7,4.7,0,0,1-2.48,1v.9a.87.87,0,0,1-.23.61.74.74,0,0,1-.59.25.84.84,0,0,1-.86-.86v-.9a4.87,4.87,0,0,1-2.38-1,2.42,2.42,0,0,1-1-1.76.77.77,0,0,1,.18-.63.82.82,0,0,1,.55-.31.8.8,0,0,1,.62.18.84.84,0,0,1,.33.58,1,1,0,0,0,.51.67,2.89,2.89,0,0,0,1.21.45V34.89a6,6,0,0,1-2.22-.82,2.29,2.29,0,0,1-1.22-2,2.39,2.39,0,0,1,1-1.91,4.92,4.92,0,0,1,2.46-1v-.94a.77.77,0,0,1,.27-.58.84.84,0,0,1,.59-.24.78.78,0,0,1,.57.24.79.79,0,0,1,.25.58v.94a5,5,0,0,1,2.38.94,2.57,2.57,0,0,1,1.06,1.77.71.71,0,0,1-.2.59.93.93,0,0,1-.57.31.81.81,0,0,1-.62-.19.82.82,0,0,1-.33-.55,1.07,1.07,0,0,0-.51-.66,3.56,3.56,0,0,0-1.21-.49v2.63a5.93,5.93,0,0,1,2.21.77,2.35,2.35,0,0,1,1.23,2.05A2.48,2.48,0,0,1,33.23,38.21Zm-4.16-5.08v-2.3a3.45,3.45,0,0,0-1.23.51c-.33.24-.49.46-.49.68C27.35,32.49,27.92,32.85,29.07,33.13ZM32,37a.93.93,0,0,0,.49-.72c0-.46-.57-.83-1.72-1.1v2.33A3.28,3.28,0,0,0,32,37Z'/></g></g>\n</svg>\n",
                    modelName: "section",
                    viewDefinition: "<figure><img src='http://placehold.it/800?text=%20' alt=''/></figure>",
                    description: "<figure><img src='http://placehold.it/800?text=%20' alt=''/></figure>",
                    selector: "[data-block-type=inline]",
                    template: [
                        {
                            title: "all",
                            url: "/pofo/template/?q=elements"
                        },
                        {
                            title: "button",
                            url: "/pofo/template/?q=inline"
                        }]
                },
                {
                    title: "price table",
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 39.28 32.47'><g><g ><path d='M39,3.67a.84.84,0,0,1,.25.59v24a.75.75,0,0,1-.25.57.81.81,0,0,1-.61.25H30.75v2.58a.84.84,0,0,1-.86.86H9.39a.88.88,0,0,1-.6-.24.84.84,0,0,1-.26-.62V29H.86a.81.81,0,0,1-.61-.25A.75.75,0,0,1,0,28.21v-24a.84.84,0,0,1,.25-.59A.79.79,0,0,1,.86,3.4H8.53V.86A.82.82,0,0,1,8.79.25.85.85,0,0,1,9.39,0h20.5a.79.79,0,0,1,.61.25.81.81,0,0,1,.25.61V3.4h7.67A.79.79,0,0,1,39,3.67ZM1.72,5.13v3.4H8.53V5.13ZM8.53,27.35V10.25H1.72v17.1Zm1.72-20.5H29V1.72H10.25ZM29,8.53H10.25V30.75H29ZM23.9,22.22a2.89,2.89,0,0,1-1,2.17,4.23,4.23,0,0,1-2.42,1.15v.95a.81.81,0,0,1-.27.59.79.79,0,0,1-.59.27.91.91,0,0,1-.86-.86v-.95a4.38,4.38,0,0,1-2.36-1.06,2.92,2.92,0,0,1-1-2,.78.78,0,0,1,.2-.64.91.91,0,0,1,.57-.3.78.78,0,0,1,.62.2.74.74,0,0,1,.29.57,1.26,1.26,0,0,0,.51.93,3.26,3.26,0,0,0,1.21.59V20.34q-3.4-.87-3.4-3.24a3,3,0,0,1,1-2.18,4.42,4.42,0,0,1,2.44-1.18v-.91a.84.84,0,0,1,.86-.86.79.79,0,0,1,.61.25.81.81,0,0,1,.25.61v.91a4.38,4.38,0,0,1,2.36,1.06,3,3,0,0,1,1,2.05.8.8,0,0,1-.18.62.74.74,0,0,1-.58.3.81.81,0,0,1-.61-.2.86.86,0,0,1-.31-.56,1.57,1.57,0,0,0-.55-.94,2.79,2.79,0,0,0-1.17-.57V19Q23.91,19.76,23.9,22.22Zm-5.12-3.65V15.5a2.9,2.9,0,0,0-1.21.63,1.27,1.27,0,0,0-.47,1C17.1,17.75,17.66,18.25,18.78,18.57Zm2.95,4.62a1.26,1.26,0,0,0,.49-1c0-.65-.57-1.15-1.72-1.47v3.07A3.25,3.25,0,0,0,21.73,23.19Zm9-18.06v3.4H37.6V5.13ZM37.6,27.35V10.25H30.75v17.1Z'/></g></g>\n</svg>\n",
                    modelName: "section",
                    viewDefinition: "<figure><img src='http://placehold.it/800?text=%20' alt=''/></figure>",
                    description: "<figure><img src='http://placehold.it/800?text=%20' alt=''/></figure>",
                    selector: "[data-block-type=inline]",
                    template: [
                        {
                            title: "all",
                            url: "/pofo/template/?q=elements"
                        },
                        {
                            title: "button",
                            url: "/pofo/template/?q=inline"
                        }]
                },
                {
                    title: "schedule",
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16'><path d='M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z'/><path d='M9 7.5a.5.5 0 0 1 .5-.5H15v2H9.5a.5.5 0 0 1-.5-.5v-1zm-2 3v1a.5.5 0 0 1-.5.5H1v-2h5.5a.5.5 0 0 1 .5.5z'/>\n</svg>\n",
                    modelName: "section",
                    viewDefinition: "<figure><img src='http://placehold.it/800?text=%20' alt=''/></figure>",
                    description: "<figure><img src='http://placehold.it/800?text=%20' alt=''/></figure>",
                    selector: "[data-block-type=inline]",
                    template: [
                        {
                            title: "all",
                            url: "/pofo/template/?q=elements"
                        },
                        {
                            title: "button",
                            url: "/pofo/template/?q=inline"
                        }]
                }, "|",
                {
                    title: "call to action",
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 41.01 41' fill='currentColor' ><g><g><path d='M40.75.25A.81.81,0,0,1,41,.86v23.9a.8.8,0,0,1-.27.62.85.85,0,0,1-.59.25.89.89,0,0,1-.6-.25.82.82,0,0,1-.26-.62v-23H1.72V25l5.21-9.18a1.18,1.18,0,0,1,.7-.41.66.66,0,0,1,.69.28l5.25,6,3.65-5.86a.78.78,0,0,1,.51-.39.74.74,0,0,1,.66.1.83.83,0,0,1,.37.55.94.94,0,0,1-.11.64l-4.26,6.8a.68.68,0,0,1-.66.41.52.52,0,0,1-.36,0,.68.68,0,0,1-.33-.24L7.83,17.67,1.72,28.41V29H19.64a.84.84,0,0,1,.86.86.79.79,0,0,1-.25.61.81.81,0,0,1-.61.25H.86a.81.81,0,0,1-.61-.25A.79.79,0,0,1,0,29.89V.86A.81.81,0,0,1,.25.25.81.81,0,0,1,.86,0H40.14A.81.81,0,0,1,40.75.25Zm-35,7A4.26,4.26,0,0,1,9.39,5.13a4.18,4.18,0,0,1,4.26,4.26,4.26,4.26,0,0,1-4.26,4.26A4.26,4.26,0,0,1,5.13,9.39,4.15,4.15,0,0,1,5.7,7.26Zm5.51.35a2.45,2.45,0,0,0-1.82-.76A2.49,2.49,0,0,0,6.85,9.39a2.5,2.5,0,0,0,.73,1.82,2.55,2.55,0,0,0,3.63,0A2.45,2.45,0,0,0,12,9.39,2.41,2.41,0,0,0,11.21,7.61ZM40.75,29.27a.84.84,0,0,1,.25.46.79.79,0,0,1-.08.49.78.78,0,0,1-.78.53H34.77l3.56,6.44a.71.71,0,0,1,.05.63.78.78,0,0,1-.41.51l-5.13,2.59a1.45,1.45,0,0,1-.37.08.84.84,0,0,1-.78-.45l-3.77-6.81-4.34,3.41a.82.82,0,0,1-.91.08.69.69,0,0,1-.32-.29.81.81,0,0,1-.13-.45V12.79a.84.84,0,0,1,.15-.47.72.72,0,0,1,.36-.31.93.93,0,0,1,.5,0,.9.9,0,0,1,.43.23ZM38.09,29,23.9,14.88V34.73l3.77-3a.79.79,0,0,1,.54-.16h.16a.9.9,0,0,1,.58.45l3.85,7,3.61-1.8L32.55,30.3a.8.8,0,0,1,.05-.82.73.73,0,0,1,.73-.45Z'/></g></g></svg>",
                    modelName: "column",
                    viewDefinition: "<div data-block-type='column' class='col'><div data-block-type='content'><div data-block-type='text-container'></div></div></div>",
                    description: "<div data-block-type='column' class='col'><div data-block-type='content'><div data-block-type='text-container'></div></div></div>",
                    selector: "[data-block-type=column]",
                    template: [
                        {
                            title: "all",
                            url: "/pofo/template/?q=elements"
                        },
                        {
                            title: "button",
                            url: "/pofo/template/?q=inline"
                        }]
                },
                {
                    title: "card",
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-file-richtext'     viewBox='0 0 16 16'><path d='M7 4.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm-.861 1.542 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V7.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V7s1.54-1.274 1.639-1.208zM5 9a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z'/><path d='M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z'/></svg>",
                    modelName: "column",
                    viewDefinition: "<div data-block-type='column' class='col'><div class='card' data-block-type='block'><div data-block-type='content'><figure class='image card-img-top'><img src='http://placehold.it/200?text=%20' class='card-img-top' alt='...'></figure></div><div class='card-body' data-block-type='content'><h5 class='card-title text-align-center'>Card title</h5><p class='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p><a href='#' class='btn btn-c-primary' data-block-type='inline'><span data-block-type='text'>Go somewhere</span></a></div></div></div>",
                    description: "<div data-block-type='column' class='col'><div class='card' data-block-type='block'><figure><img src='http://placehold.it/200?text=%20' class='card-img-top' alt='...'></figure><div class='card-body' data-block-type='content'><h5 class='card-title text-align-center'>Card title</h5><p class='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p><a href='#' class='btn btn-c-primary' data-block-type='inline'><span data-block-type='text'>Go somewhere</span></a></div></div></div>",
                    selector: "[data-block-type=column]",
                    template: [
                        {
                            title: "all",
                            url: "/pofo/template/?q=card"
                        },
                        {
                            title: "button",
                            url: "/pofo/template/?q=card"
                        }]
                },
                {
                    title: "featured image",
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 34.19 34.19' fill='currentColor'><g><g><path d='M.86,23.94a.78.78,0,0,1-.59-.26.83.83,0,0,1-.27-.6V.86A.79.79,0,0,1,.27.25.81.81,0,0,1,.86,0H33.33a.84.84,0,0,1,.86.86V23.08a.88.88,0,0,1-.24.6.8.8,0,0,1-.62.26Zm8.73-9.3-8.07,9a.78.78,0,0,1-.6.28,1,1,0,0,1-.63-.22A.71.71,0,0,1,0,23.14a1,1,0,0,1,.21-.63L8.81,13a.81.81,0,0,1,.54-.29.72.72,0,0,1,.57.16L15,16.44,22.14,7.5a.87.87,0,0,1,1.35,0L34,22.59a.93.93,0,0,1,.14.68.75.75,0,0,1-.34.53.93.93,0,0,1-.66.12.81.81,0,0,1-.57-.34L22.76,9.51l-6.89,8.65a.78.78,0,0,1-.56.33.88.88,0,0,1-.63-.16ZM.86,29.07a.79.79,0,0,1-.59-.27A.79.79,0,0,1,0,28.21a.83.83,0,0,1,.27-.6.82.82,0,0,1,.59-.26h13.7a.8.8,0,0,1,.57.24.87.87,0,0,1,.25.62.85.85,0,0,1-.25.61.77.77,0,0,1-.57.25Zm0,5.12A.84.84,0,0,1,.27,34,.81.81,0,0,1,0,33.33a.79.79,0,0,1,.27-.61.81.81,0,0,1,.59-.25h13.7a.77.77,0,0,1,.57.25.85.85,0,0,1,.25.61.87.87,0,0,1-.25.62.8.8,0,0,1-.57.24Zm.86-12H32.47V1.72H1.72ZM10.87,7a3.54,3.54,0,0,1-1,2.54,3.29,3.29,0,0,1-2.46,1.07A3.23,3.23,0,0,1,4.94,9.55,3.56,3.56,0,0,1,3.94,7a3.51,3.51,0,0,1,1-2.52A3.25,3.25,0,0,1,7.38,3.44,3.31,3.31,0,0,1,9.84,4.49,3.5,3.5,0,0,1,10.87,7ZM9.14,7a1.89,1.89,0,0,0-.51-1.33,1.7,1.7,0,0,0-2.5,0A1.89,1.89,0,0,0,5.62,7a1.83,1.83,0,0,0,.53,1.33,1.63,1.63,0,0,0,2.46,0A1.87,1.87,0,0,0,9.14,7ZM19.68,29.07a.81.81,0,0,1-.62-.27.84.84,0,0,1-.24-.59.88.88,0,0,1,.24-.6.84.84,0,0,1,.62-.26H33.33a.82.82,0,0,1,.86.86.84.84,0,0,1-.86.86Zm0,5.12a.82.82,0,0,1-.86-.86.84.84,0,0,1,.86-.86H33.33a.84.84,0,0,1,.86.86.82.82,0,0,1-.86.86Z'/></g></g></svg>",
                    modelName: "column",
                    viewDefinition: "<div data-block-type='column' class='col'><div data-block-type='content'><div data-block-type='text-container'></div></div></div>",
                    description: "<div data-block-type='column' class='col'><div data-block-type='content'><div data-block-type='text-container'></div></div></div>",
                    selector: "[data-block-type=column]",
                    template: [
                        {
                            title: "all",
                            url: "/pofo/template/?q=elements"
                        },
                        {
                            title: "button",
                            url: "/pofo/template/?q=inline"
                        }]
                },
                {
                    title: "icon box",
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30.75 41'><g><g><path d='M29.89,35a.83.83,0,0,1,.63.25.94.94,0,0,1,0,1.23.83.83,0,0,1-.63.25H.86a.85.85,0,0,1-.63-.23,1,1,0,0,1,0-1.27A.85.85,0,0,1,.86,35Zm0,4.27a.82.82,0,0,1,.63.24.9.9,0,0,1,.23.62.76.76,0,0,1-.21.49,1.28,1.28,0,0,1-.49.37H.86a.85.85,0,0,1-.63-.23A.91.91,0,0,1,0,40.1c0-.3.23-.58.7-.82ZM15.38,0a12.49,12.49,0,0,1,6.43,1.76A13,13,0,0,1,26.44,6.4a12.19,12.19,0,0,1,1.77,6.39,12.44,12.44,0,0,1-1.77,6.44,12.92,12.92,0,0,1-4.63,4.63,12.58,12.58,0,0,1-12.87,0,13,13,0,0,1-4.59-4.63,12.44,12.44,0,0,1-1.77-6.44A12.19,12.19,0,0,1,4.35,6.4,13,13,0,0,1,8.94,1.76,12.5,12.5,0,0,1,15.38,0Zm0,1.72A10.83,10.83,0,0,0,9.8,3.2a11,11,0,0,0-4,4,10.75,10.75,0,0,0-1.5,5.57,10.78,10.78,0,0,0,1.5,5.58,11.25,11.25,0,0,0,4,4,10.84,10.84,0,0,0,5.58,1.49A10.83,10.83,0,0,0,21,22.41a11.25,11.25,0,0,0,4-4,10.78,10.78,0,0,0,1.5-5.58A10.75,10.75,0,0,0,25,7.22a11,11,0,0,0-4-4A10.82,10.82,0,0,0,15.38,1.72ZM23.08,29a.78.78,0,0,1,.6.24.89.89,0,0,1,.22.62.85.85,0,0,1-.22.61.76.76,0,0,1-.6.25H7.71a.82.82,0,0,1-.64-.23.85.85,0,0,1-.22-.63.87.87,0,0,1,.22-.64A.86.86,0,0,1,7.71,29Zm-7.7-23.9a1,1,0,0,1,.49.12.4.4,0,0,1,.2.37L18,9.23l4.1.49c.16,0,.34.12.53.37l.12.16a.55.55,0,0,1,.07.45.92.92,0,0,1-.23.41L19.64,14l.7,4.1a1.44,1.44,0,0,1-.05.45.63.63,0,0,1-.28.37c-.41.22-.7.22-.86,0l-3.77-1.68-3.57,1.89c-.41.16-.7.16-.86,0a.63.63,0,0,1-.33-.37,2,2,0,0,1,0-.49l.69-4.1L8.2,11.27c-.11-.1-.16-.39-.16-.86A1.09,1.09,0,0,1,8.32,10a.69.69,0,0,1,.41-.12l4.1-.53,1.85-3.57a.66.66,0,0,1,.2-.53A.77.77,0,0,1,15.38,5.13Zm0,2.74-1.19,2.54a3.46,3.46,0,0,1-.7.54l-2.71.32,2.05,1.89a.6.6,0,0,1,.23.33.32.32,0,0,1-.06.33l-.54,2.74,2.59-1.35c.16-.16.45-.16.86,0l2.54,1.35L18,13.82a2.13,2.13,0,0,1,0-.41.46.46,0,0,1,.14-.25l2.05-1.89L17.42,11a.52.52,0,0,1-.38-.13,1.35,1.35,0,0,1-.31-.41Z'/></g></g></svg>",
                    modelName: "column",
                    viewDefinition: "<figure><img src='http://placehold.it/800?text=%20' alt=''/></figure>",
                    description: "<figure><img src='http://placehold.it/800?text=%20' alt=''/></figure>",
                    selector: "[data-block-type=inline]",
                    template: [
                        {
                            title: "all",
                            url: "/pofo/template/?q=elements"
                        },
                        {
                            title: "button",
                            url: "/pofo/template/?q=inline"
                        }]
                },
                {
                    title: "team member",
                    icon: "<svg focusable='false' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512' class='svg-inline--fa fa-address-card fa-w-18 fa-2x'><path fill='currentColor'      d='M512 32H64C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zm32 384c0 17.6-14.4 32-32 32H64c-17.6 0-32-14.4-32-32V96c0-17.6 14.4-32 32-32h448c17.6 0 32 14.4 32 32v320zm-72-128H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zm0-64H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zm0-64H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zM208 288c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80zm0-128c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48 21.5-48 48-48zm46.8 144c-19.5 0-24.4 7-46.8 7s-27.3-7-46.8-7c-21.2 0-41.8 9.4-53.8 27.4C100.2 342.1 96 355 96 368.9V392c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-23.1c0-7 2.1-13.8 6-19.6 5.6-8.3 15.8-13.2 27.3-13.2 12.4 0 20.8 7 46.8 7 25.9 0 34.3-7 46.8-7 11.5 0 21.7 5 27.3 13.2 3.9 5.8 6 12.6 6 19.6V392c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-23.1c0-13.9-4.2-26.8-11.4-37.5-12.3-18-32.9-27.4-54-27.4z'      class=''/>\n</svg>\n",
                    modelName: "column",
                    viewDefinition: "<figure><img src='http://placehold.it/800?text=%20' alt=''/></figure>",
                    description: "<figure><img src='http://placehold.it/800?text=%20' alt=''/></figure>",
                    selector: "[data-block-type=column]",
                    template: [
                        {
                            title: "basic",
                            url: "/pofo/template/?q=elements"
                        },
                        {
                            title: "button",
                            url: "/pofo/template/?q=inline"
                        }]
                }]
        },
        {
            title: "content",
            elements: [
                {
                    title: "heading",
                    icon: "<svg focusable='false' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' ><path fill='currentColor'      d='M416 64v384h56a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8H328a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8h56V272H128v176h56a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8H40a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8h56V64H40a8 8 0 0 1-8-8V40a8 8 0 0 1 8-8h144a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8h-56v176h256V64h-56a8 8 0 0 1-8-8V40a8 8 0 0 1 8-8h144a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8z'/>\n</svg>\n",
                    modelName: "heading1",
                    description: "<h2 class='test'> Lorem ipsum dolor.</h2>",
                    selector: "[data-block-type=inline]",
                    template: [
                        {
                            title: "basic",
                            url: "/pofo/template/?q=elements"
                        }]
                },
                {
                    title: "paragraph",
                    icon: "<svg focusable='false' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'><path fill='currentColor'      d='M440 32H224A160 160 0 0 0 64.35 202.65c5.5 85 79.91 149.35 165.13 149.35H256v120a8 8 0 0 0 8 8h16a8 8 0 0 0 8-8V64h64v408a8 8 0 0 0 8 8h16a8 8 0 0 0 8-8V64h56a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8zM256 320h-32a128 128 0 0 1 0-256h32z'      />\n</svg>\n",
                    modelName: "paragraph",
                    description: "<p class='test'> Lorem ipsum dolor.</p>",
                    selector: "[data-block-type=inline]",
                    template: [
                        {
                            title: "basic",
                            url: "/pofo/template/?q=elements"
                        }]
                },
                {
                    title: "Text",
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' version='1.1' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'>\n<g>\n\t<g>\n\t\t<path d='M492,0H20C8.954,0,0,8.954,0,20v88c0,11.046,8.954,20,20,20s20-8.954,20-20V40h156v432h-30c-11.046,0-20,8.954-20,20    c0,11.046,8.954,20,20,20h180c11.046,0,20-8.954,20-20c0-11.046-8.954-20-20-20h-30V120c0-11.046-8.954-20-20-20    c-11.046,0-20,8.954-20,20v352h-40V40h236v68c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20V20C512,8.954,503.046,0,492,0z'/>\n\t</g>\n</g>\n</svg>\n",
                    modelName: "text-container",
                    viewDefinition: "<div data-block-type='text-container' class='test'> Lorem ipsum dolor.</div>",
                    description: "<div data-block-type='text-container' class='test'> Lorem ipsum dolor.</div>",
                    selector: "[data-block-type=text-container]",
                    template: [
                        {
                            title: "basic",
                            url: "/pofo/template/?q=elements"
                        }]
                },
                {
                    title: "Block widget",
                    icon: "<?xml version='1.0' encoding='utf-8'?>\n<!-- Generator: Adobe Illustrator 23.0.3, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n<svg version='1.0' id='Calque_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 20 20' style='enable-background:new 0 0 20 20;' xml:space='preserve'>\n<g>\n\t<path d='M14.2,8.2h-2.4V6.7c0-0.2-0.2-0.3-0.3-0.3H5.8c-0.2,0-0.3,0.2-0.3,0.3v4.7c0,0.2,0.2,0.3,0.3,0.3h2.4v1.5\n\t\tc0,0.2,0.2,0.3,0.3,0.3h5.6c0.2,0,0.3-0.2,0.3-0.3V8.5C14.5,8.4,14.3,8.2,14.2,8.2z M6.4,10.9V7.3h4.5v3.6H6.4z M13.6,12.7H9.1\n\t\tv-0.9h2.4c0.2,0,0.3-0.1,0.3-0.3V9.3h1.8V12.7z'/>\n</g><path d='M1.9,3.1c0-1,0.8-1.9,1.9-1.9h12.5c1,0,1.9,0.8,1.9,1.9v4.5c1.3,0.3,2.1,1.7,1.8,3c-0.2,0.9-0.9,1.6-1.8,1.8v4.5\n\tc0,1-0.8,1.9-1.9,1.9H3.8c-1,0-1.9-0.8-1.9-1.9v-4.5c-1.3-0.3-2.1-1.7-1.8-3C0.3,8.5,1,7.8,1.9,7.6V3.1z M3.1,7.6\n\tc1.3,0.3,2.1,1.7,1.8,3c-0.2,0.9-0.9,1.6-1.8,1.8v4.5c0,0.3,0.3,0.6,0.6,0.6h12.5c0.3,0,0.6-0.3,0.6-0.6v-4.5\n\tc-1.3-0.3-2.1-1.7-1.8-3c0.2-0.9,0.9-1.6,1.8-1.8V3.1c0-0.3-0.3-0.6-0.6-0.6H3.8c-0.3,0-0.6,0.3-0.6,0.6V7.6z M2.5,8.8\n\tc-0.7,0-1.2,0.6-1.2,1.2c0,0.7,0.6,1.2,1.2,1.2s1.2-0.6,1.2-1.2C3.8,9.3,3.2,8.8,2.5,8.8z M17.5,8.8c-0.7,0-1.2,0.6-1.2,1.2\n\tc0,0.7,0.6,1.2,1.2,1.2c0.7,0,1.2-0.6,1.2-1.2C18.7,9.3,18.2,8.8,17.5,8.8z'/>\n</svg>\n",
                    modelName: "blockWidget",
                    viewDefinition: "<div data-block-type='block-widget' class='test'></div>",
                    description: "<div data-block-type='block-widget' class='test'> Lorem ipsum dolor.</div>",
                    selector: "[data-block-type=block-widget]",
                    template: [
                        {
                            title: "basic",
                            url: "/pofo/template/?q=elements"
                        }]
                },
                {
                    title: "Line separator",
                    icon: "<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M2 9h16v2H2z'/></svg>",
                    modelName: "horizontalLine",
                    viewDefinition: "<hr>",
                    description: "<div data-block-type='block-widget' class='test'> Lorem ipsum dolor.</div>"
                },
                {
                    title: "Page break",
                    icon: "<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M3.598.687h1.5v5h-1.5zm14.5 0h1.5v5h-1.5z'/><path d='M19.598 4.187v1.5h-16v-1.5zm-16 14.569h1.5v-5h-1.5zm14.5 0h1.5v-5h-1.5z'/><path d='M19.598 15.256v-1.5h-16v1.5zM5.081 9h6v2h-6zm8 0h6v2h-6zm-9.483 1L0 12.5v-5z'/></svg>",
                    modelName: "pageBreak",
                    viewDefinition: "<div class='page-break' style='page-break-before:always; page-break-after:always'></div>",
                    description: "<div class='page-break' style='page-break-before:always; page-break-after:always'></div>"
                },
                {
                    title: "list group",
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-list-ul' viewBox='0 0 16 16'><path fill-rule='evenodd'      d='M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z'/>\n</svg>\n",
                    modelName: "listItem",
                    viewDefinition: "<ul class='list-group'><li class='list-group-item'>item 1</li><li class='list-group-item'>item 2</li><li class='list-group-item'>item 3</li></ul>",
                    description: "<ul class='list-group'><li class='list-group-item'>item 1</li><li class='list-group-item'>item 2</li><li class='list-group-item'>item 3</li></ul>",
                    selector: "[data-block-type=inline]",
                    template: [
                        {
                            title: "list group",
                            url: "/pofo/template/?q=elements"
                        },
                        {
                            title: "breadcrumb",
                            url: "/pofo/template/?q=inline"
                        }]
                },
                {
                    title: "accordion",
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 41 41' fill='currentColor'><g><g ><path d='M40.26,11a2.45,2.45,0,0,1,.74,1.8V28.17A2.51,2.51,0,0,1,40.26,30a2.4,2.4,0,0,1-1.8.76H2.58A2.45,2.45,0,0,1,.76,30,2.45,2.45,0,0,1,0,28.17V12.79A2.4,2.4,0,0,1,.76,11a2.51,2.51,0,0,1,1.82-.74H38.46A2.45,2.45,0,0,1,40.26,11Zm-1,1.8a.86.86,0,0,0-.82-.82H2.58a.81.81,0,0,0-.61.25.75.75,0,0,0-.25.57V28.17a.81.81,0,0,0,.25.61.81.81,0,0,0,.61.25H38.46a.75.75,0,0,0,.57-.25.81.81,0,0,0,.25-.61ZM3.67,1.48A.81.81,0,0,1,3.4.86.79.79,0,0,1,3.67.25.83.83,0,0,1,4.26,0H36.74a.83.83,0,0,1,.59.27.79.79,0,0,1,.27.59.83.83,0,0,1-.27.6.86.86,0,0,1-.59.26H4.26A.86.86,0,0,1,3.67,1.48Zm0,5.12A.79.79,0,0,1,3.4,6a.81.81,0,0,1,.27-.62.86.86,0,0,1,.59-.24H36.74a.81.81,0,0,1,.59.26.83.83,0,0,1,.27.6.81.81,0,0,1-.27.59.83.83,0,0,1-.59.27H4.26A.83.83,0,0,1,3.67,6.6ZM37.33,34.4a.84.84,0,0,1,0,1.23.89.89,0,0,1-.59.25H4.26a.81.81,0,0,1-.59-.27.79.79,0,0,1,0-1.19.81.81,0,0,1,.59-.27H36.74A.84.84,0,0,1,37.33,34.4Zm0,5.12a.81.81,0,0,1,.27.62.78.78,0,0,1-.27.61.84.84,0,0,1-.59.25H4.26a.81.81,0,0,1-.59-.27.79.79,0,0,1-.27-.59.83.83,0,0,1,.27-.6.84.84,0,0,1,.59-.26H36.74A.88.88,0,0,1,37.33,39.52Z'/></g></g>\n</svg>\n",
                    modelName: "listItem",
                    viewDefinition: "<figure><img src='http://placehold.it/800?text=%20' alt=''/></figure>",
                    description: "<figure><img src='http://placehold.it/800?text=%20' alt=''/></figure>",
                    selector: "[data-block-type=inline]",
                    template: [
                        {
                            title: "all",
                            url: "/pofo/template/?q=elements"
                        },
                        {
                            title: "button",
                            url: "/pofo/template/?q=inline"
                        }]
                },
                {
                    title: "countdown",
                    icon: "<svg focusable='false' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' class='svg-inline--fa fa-stopwatch-20 fa-w-14 fa-2x'><path fill='currentColor'      d='M393.3,141.3l17.5-17.5a12,12,0,0,0,0-17l-5.71-5.71a12,12,0,0,0-17,0l-17.5,17.5A223.09,223.09,0,0,0,238.91,64.41V32h25a12,12,0,0,0,12-12V12a12,12,0,0,0-12-12h-80a12,12,0,0,0-12,12v8a12,12,0,0,0,12,12h23V64.59C91.2,73.3,0,170,0,288,0,411.7,100.3,512,224,512S448,411.7,448,288A223,223,0,0,0,393.3,141.3ZM224,480A192,192,0,1,1,416,288,191.93,191.93,0,0,1,224,480ZM178.48,307.91l2.41-3.32C201,277.09,212,262,212,229.05c0-39.46-15.91-57.05-51.58-57.05C125.14,172,108,190.41,108,228.25v4.06a4.21,4.21,0,0,0,4.33,4.07h24.9a4.21,4.21,0,0,0,4.33-4.07v-5.23c0-8,0-26.67,16.69-26.67,16.2,0,16.2,15.67,16.2,28.26,0,25-6.73,34.58-24.75,60.27l-3.06,4.37c-23.44,33.46-35.06,55.36-37.75,89.39a12.06,12.06,0,0,0,3.22,9.22,12.64,12.64,0,0,0,9.41,4.08h82.84a4.21,4.21,0,0,0,4.33-4.06V369.62a4.21,4.21,0,0,0-4.33-4.07H150.75l.52-4.46C153.34,342.91,169.22,320,178.48,307.91ZM288.19,172C254.05,172,236,192.48,236,231.22V336.56c0,40.55,16.12,59.44,50.77,59.44,36.31,0,53.23-19,53.23-59.69v-107C340,203.16,331,172,288.19,172Zm16.7,169c0,16.78-5.72,25.28-17,25.28s-17.24-8.28-17.24-24.61V225.73c0-19.84,9.38-24,17.24-24s17,4.05,17,23.34Z'      class=''/>\n</svg>\n",
                    modelName: "blockWidget",
                    viewDefinition: "<div data-block-type='block-widget' data-box-style='3' data-countdown='true' data-widget-type='countdown'></div>",
                    description: "<figure><img src='http://placehold.it/800?text=%20' alt=''/></figure>",
                    selector: "[data-block-type=block-widget]",
                    template: [
                        {
                            title: "single",
                            url: "/pofo/template/?q=elements"
                        },
                        {
                            title: "with icon",
                            url: "/pofo/template/?q=inline"
                        },
                        {
                            title: "with image",
                            url: "/pofo/template/?q=inline"
                        }]
                }, "|",
                {
                    title: "Animations",
                    icon: "<?xml version='1.0' encoding='iso-8859-1'?><svg version='1.1' xmlns='http://www.w3.org/2000/svg' x='0px'     y='0px'     viewBox='0 0 511.904 511.904' style='enable-background:new 0 0 511.904 511.904;' xml:space='preserve'><g transform='translate(-1)' fill='currentColor'>\t<g>\t\t<path d='M449.975,291.041c-4.019,2.458-5.282,7.714-2.833,11.733c49.408,80.862,62.404,148.787,33.92,177.272\t\t\tc-33.679,33.679-118.611,8.444-209.39-55.226c27.366-20.76,55.059-44.877,82.171-71.989\t\t\tc132.42-132.42,193.604-278.707,139.281-333.03C457.95-15.357,383.104-3.18,292.924,52.432c-4.019,2.466-5.265,7.723-2.79,11.742\t\t\tc2.475,4.011,7.74,5.257,11.742,2.782c81.758-50.406,150.4-63.855,179.183-35.081c45.969,45.969-17.818,187.418-139.281,308.89\t\t\tc-27.687,27.687-56.41,52.363-84.805,73.438c-28.396-21.076-57.12-45.752-84.808-73.438\t\t\tC50.701,219.293-13.086,77.844,32.883,31.875c45.961-45.969,187.418,17.809,308.89,139.281\t\t\tc9.362,9.362,33.064,33.489,49.322,50.669h-31.723c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h51.2\t\t\tc0.036,0,0.071-0.005,0.107-0.005c0.169-0.002,0.338-0.013,0.507-0.026c0.115-0.008,0.232-0.014,0.346-0.026\t\t\tc0.156-0.018,0.311-0.045,0.466-0.071c0.123-0.021,0.247-0.038,0.368-0.064c0.143-0.031,0.283-0.071,0.424-0.109\t\t\tc0.128-0.035,0.258-0.066,0.384-0.106c0.134-0.043,0.265-0.096,0.397-0.145c0.128-0.048,0.257-0.093,0.382-0.147\t\t\tc0.126-0.055,0.249-0.119,0.374-0.18c0.126-0.062,0.253-0.121,0.375-0.189c0.117-0.065,0.23-0.138,0.344-0.209\t\t\tc0.124-0.077,0.25-0.152,0.37-0.235c0.107-0.074,0.21-0.156,0.314-0.235c0.12-0.092,0.241-0.183,0.356-0.28\t\t\tc0.032-0.027,0.066-0.049,0.098-0.077c0.07-0.062,0.131-0.13,0.199-0.193c0.109-0.102,0.217-0.204,0.321-0.311\t\t\tc0.095-0.098,0.185-0.2,0.274-0.301c0.095-0.108,0.188-0.216,0.277-0.329c0.084-0.107,0.164-0.215,0.243-0.325\t\t\tc0.085-0.118,0.168-0.238,0.247-0.361c0.068-0.106,0.133-0.214,0.196-0.322c0.08-0.137,0.156-0.275,0.228-0.416\t\t\tc0.05-0.098,0.097-0.197,0.143-0.296c0.073-0.158,0.142-0.319,0.206-0.482c0.034-0.087,0.065-0.174,0.096-0.261\t\t\tc0.063-0.178,0.12-0.358,0.171-0.541c0.022-0.079,0.042-0.158,0.061-0.238c0.047-0.188,0.088-0.378,0.122-0.572\t\t\tc0.014-0.082,0.026-0.165,0.038-0.247c0.027-0.188,0.051-0.377,0.065-0.568c0.007-0.095,0.01-0.189,0.014-0.284\t\t\tc0.006-0.126,0.019-0.251,0.019-0.378v-51.2c0-4.71-3.823-8.533-8.533-8.533s-8.533,3.823-8.533,8.533v29.414\t\t\tc-16.396-17.273-39.071-40.354-48.199-49.482C221.427,26.67,75.14-34.514,20.817,19.801\t\t\tc-54.323,54.323,6.861,200.61,139.281,333.03c27.113,27.113,54.805,51.232,82.171,71.991\t\t\tc-90.775,63.665-175.705,88.896-209.39,55.224c-27.604-27.604-16.436-92.164,27.826-168.44v21.153c0,4.71,3.823,8.533,8.533,8.533\t\t\ts8.533-3.823,8.533-8.533v-51.2c0-0.023-0.003-0.044-0.003-0.067c-0.001-0.124-0.012-0.247-0.019-0.37\t\t\tc-0.008-0.165-0.013-0.33-0.031-0.492c-0.001-0.01-0.003-0.021-0.005-0.031c-0.124-1.103-0.455-2.142-0.959-3.077\t\t\tc-0.002-0.004-0.003-0.008-0.005-0.011c-0.064-0.119-0.139-0.232-0.209-0.347c-0.596-0.994-1.401-1.878-2.404-2.583\t\t\tc-0.049-0.035-0.095-0.073-0.145-0.106c-0.026-0.018-0.049-0.038-0.075-0.055c-0.14-0.092-0.286-0.169-0.429-0.251\t\t\tc-0.074-0.043-0.145-0.089-0.221-0.129c-0.177-0.095-0.357-0.178-0.538-0.259c-0.072-0.032-0.143-0.068-0.216-0.099\t\t\tc-0.195-0.081-0.392-0.15-0.59-0.216c-0.065-0.021-0.128-0.046-0.193-0.066c-0.215-0.066-0.431-0.119-0.648-0.167\t\t\tc-0.054-0.012-0.107-0.027-0.161-0.038c-0.237-0.047-0.475-0.082-0.714-0.109c-0.041-0.005-0.08-0.012-0.121-0.016\t\t\tc-0.263-0.026-0.526-0.039-0.789-0.04c-0.019,0-0.038-0.003-0.058-0.003h-0.029c-0.043,0-0.085-0.001-0.128,0H18.038\t\t\tc-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h35.656c-55.558,89.956-68.305,166.604-32.881,202.02\t\t\tc13.414,13.406,32.418,19.78,55.441,19.78c47.722,0,112.688-27.388,180.715-76.218c68.029,48.836,132.995,76.224,180.719,76.218\t\t\tc23.014,0,42.035-6.374,55.441-19.78c34.867-34.867,23.125-108.971-31.42-198.238\t\t\tC459.251,289.855,454.012,288.592,449.975,291.041z'/>\t</g></g></svg>",
                    modelName: "element",
                    viewDefinition: null,
                    description: "<span data-block-type='element' class='badge bg-primary'><span data-block-type='text'>badge</span></span>",
                    selector: "[data-block-type=element]",
                    template: [
                        {
                            title: "all",
                            url: "/pofo/template/?q=elements"
                        },
                        {
                            title: "button",
                            url: "/pofo/template/?q=inline"
                        }]
                },
                {
                    title: "badge",
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-bookmark' viewBox='0 0 16 16'><path d='M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z'/>\n</svg>",
                    modelName: "element",
                    viewDefinition: "<span data-block-type='element' class='badge bg-primary'><span data-block-type='text'>badge</span></span>",
                    description: "<span data-block-type='element' class='badge bg-primary'><span data-block-type='text'>badge</span></span>",
                    selector: "[data-block-type=element]",
                    template: [
                        {
                            title: "all",
                            url: "/pofo/template/?q=elements"
                        },
                        {
                            title: "button",
                            url: "/pofo/template/?q=inline"
                        }]
                },
                {
                    title: "countdown",
                    icon: "<svg focusable='false' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' class='svg-inline--fa fa-stopwatch-20 fa-w-14 fa-2x'><path fill='currentColor'      d='M393.3,141.3l17.5-17.5a12,12,0,0,0,0-17l-5.71-5.71a12,12,0,0,0-17,0l-17.5,17.5A223.09,223.09,0,0,0,238.91,64.41V32h25a12,12,0,0,0,12-12V12a12,12,0,0,0-12-12h-80a12,12,0,0,0-12,12v8a12,12,0,0,0,12,12h23V64.59C91.2,73.3,0,170,0,288,0,411.7,100.3,512,224,512S448,411.7,448,288A223,223,0,0,0,393.3,141.3ZM224,480A192,192,0,1,1,416,288,191.93,191.93,0,0,1,224,480ZM178.48,307.91l2.41-3.32C201,277.09,212,262,212,229.05c0-39.46-15.91-57.05-51.58-57.05C125.14,172,108,190.41,108,228.25v4.06a4.21,4.21,0,0,0,4.33,4.07h24.9a4.21,4.21,0,0,0,4.33-4.07v-5.23c0-8,0-26.67,16.69-26.67,16.2,0,16.2,15.67,16.2,28.26,0,25-6.73,34.58-24.75,60.27l-3.06,4.37c-23.44,33.46-35.06,55.36-37.75,89.39a12.06,12.06,0,0,0,3.22,9.22,12.64,12.64,0,0,0,9.41,4.08h82.84a4.21,4.21,0,0,0,4.33-4.06V369.62a4.21,4.21,0,0,0-4.33-4.07H150.75l.52-4.46C153.34,342.91,169.22,320,178.48,307.91ZM288.19,172C254.05,172,236,192.48,236,231.22V336.56c0,40.55,16.12,59.44,50.77,59.44,36.31,0,53.23-19,53.23-59.69v-107C340,203.16,331,172,288.19,172Zm16.7,169c0,16.78-5.72,25.28-17,25.28s-17.24-8.28-17.24-24.61V225.73c0-19.84,9.38-24,17.24-24s17,4.05,17,23.34Z'      class=''/>\n</svg>\n",
                    modelName: "element",
                    viewDefinition: "<span data-block-type='element' data-counter='true' data-speed='3500' data-refresh-interval='50' data-to='88000' data-from='0' data-seperator='true'><span data-block-type='text'></span></span>",
                    description: "<figure><img src='http://placehold.it/800?text=%20' alt=''/></figure>",
                    selector: "[data-block-type=element]",
                    template: [
                        {
                            title: "single",
                            url: "/pofo/template/?q=elements"
                        },
                        {
                            title: "with icon",
                            url: "/pofo/template/?q=inline"
                        },
                        {
                            title: "with image",
                            url: "/pofo/template/?q=inline"
                        }]
                },
                {
                    title: "counter",
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40.99 29.93'><g><g><path d='M5,8.88a.9.9,0,0,1,.17.55V23.08a.83.83,0,0,1-.27.6.8.8,0,0,1-.59.26.89.89,0,0,1-.86-.86V12.22L1.55,15a.79.79,0,0,1-.51.37.83.83,0,0,1-.66-.13A.85.85,0,0,1,0,14.7a.82.82,0,0,1,.15-.64l3.4-5.12A.78.78,0,0,1,4,8.61a.89.89,0,0,1,.51,0A.64.64,0,0,1,5,8.88Zm10,.26a4.4,4.4,0,0,1,1.56,1.56,4.2,4.2,0,0,1,.57,2.13v.49A4.05,4.05,0,0,1,16.15,16l-5,6.23h5a.79.79,0,0,1,.59.27.81.81,0,0,1,.27.59.83.83,0,0,1-.27.6.78.78,0,0,1-.59.26H9.38a.86.86,0,0,1-.78-.49A1.14,1.14,0,0,1,8.54,23a.69.69,0,0,1,.19-.43l6.06-7.63a2.39,2.39,0,0,0,.58-1.6v-.49A2.51,2.51,0,0,0,14.63,11a2.4,2.4,0,0,0-1.8-.76,2.59,2.59,0,0,0-2.59,2.58.86.86,0,0,1-.26.6.82.82,0,0,1-.6.26.8.8,0,0,1-.59-.26.83.83,0,0,1-.27-.6,4.12,4.12,0,0,1,1.25-3A4.33,4.33,0,0,1,15,9.14Zm13.61,5.6a4.47,4.47,0,0,1-1.23,1.5,4.53,4.53,0,0,1,1.23,1.49A4.24,4.24,0,0,1,29,19.68a4.15,4.15,0,0,1-.57,2.13,4.24,4.24,0,0,1-1.56,1.56,4.2,4.2,0,0,1-2.13.57,4.26,4.26,0,0,1-3.69-2.13,4.06,4.06,0,0,1-.58-2.13.81.81,0,0,1,.27-.62.86.86,0,0,1,1.19,0,.81.81,0,0,1,.27.62,2.51,2.51,0,0,0,2.54,2.54,2.47,2.47,0,0,0,1.82-.74,2.4,2.4,0,0,0,.76-1.8,2.59,2.59,0,0,0-2.58-2.58.83.83,0,0,1-.6-.27.8.8,0,0,1-.26-.59.89.89,0,0,1,.86-.86,2.51,2.51,0,0,0,1.82-.74,2.42,2.42,0,0,0,.76-1.81A2.57,2.57,0,0,0,23,11a2.5,2.5,0,0,0-.73,1.82.89.89,0,0,1-.25.6.86.86,0,0,1-1.23,0,.89.89,0,0,1-.25-.6,4.1,4.1,0,0,1,1.25-3,4.19,4.19,0,0,1,3-1.23A4.2,4.2,0,0,1,29,12.83,4.13,4.13,0,0,1,28.57,14.74ZM41,6a.81.81,0,0,1-.24.59.79.79,0,0,1-.58.25,1,1,0,0,1-.65-.25L35.87,3V29.07a.79.79,0,0,1-.27.59.81.81,0,0,1-.59.27.83.83,0,0,1-.6-.27.78.78,0,0,1-.26-.59V3L30.5,6.6a.79.79,0,0,1-.58.25.89.89,0,0,1-.61-.25A.75.75,0,0,1,29,6a.88.88,0,0,1,.29-.64L34.39.29a1.27,1.27,0,0,1,.29-.21c.08,0,.14,0,.16,0L35,0l.16,0a.45.45,0,0,1,.19,0l.18.13.08,0,5.13,5.12A1,1,0,0,1,41,6Z'/></g></g></svg>",
                    modelName: "element",
                    viewDefinition: "<span data-block-type='element' data-counter='true' data-speed='3500' data-refresh-interval='50' data-to='88000' data-from='0' class='d-inline-block'></span>",
                    description: "<figure><img src='http://placehold.it/800?text=%20' alt=''/></figure>",
                    selector: "[data-block-type=element]",
                    template: [
                        {
                            title: "single",
                            url: "/pofo/template/?q=elements"
                        },
                        {
                            title: "with icon",
                            url: "/pofo/template/?q=inline"
                        },
                        {
                            title: "with image",
                            url: "/pofo/template/?q=inline"
                        }]
                },
                {
                    title: "link",
                    icon: "<svg focusable='false' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='currentColor' d='M256 8C118.941 8 8 118.919 8 256c0 137.058 110.919 248 248 248 52.925 0 104.68-17.078 147.092-48.319 5.501-4.052 6.423-11.924 2.095-17.211l-5.074-6.198c-4.018-4.909-11.193-5.883-16.307-2.129C346.93 457.208 301.974 472 256 472c-119.373 0-216-96.607-216-216 0-119.375 96.607-216 216-216 118.445 0 216 80.024 216 200 0 72.873-52.819 108.241-116.065 108.241-19.734 0-23.695-10.816-19.503-33.868l32.07-164.071c1.449-7.411-4.226-14.302-11.777-14.302h-12.421a12 12 0 0 0-11.781 9.718c-2.294 11.846-2.86 13.464-3.861 25.647-11.729-27.078-38.639-43.023-73.375-43.023-68.044 0-133.176 62.95-133.176 157.027 0 61.587 33.915 98.354 90.723 98.354 39.729 0 70.601-24.278 86.633-46.982-1.211 27.786 17.455 42.213 45.975 42.213C453.089 378.954 504 321.729 504 240 504 103.814 393.863 8 256 8zm-37.92 342.627c-36.681 0-58.58-25.108-58.58-67.166 0-74.69 50.765-121.545 97.217-121.545 38.857 0 58.102 27.79 58.102 65.735 0 58.133-38.369 122.976-96.739 122.976z'/></svg>",
                    modelName: "element",
                    viewDefinition: "<a data-block-type='element' class='' href='#'><span data-block-type='text'>link</span></a>",
                    description: "<a data-block-type='inline' class='' href='#'><span data-block-type='text'>link</span></a>",
                    selector: "[data-block-type=element]",
                    template: [
                        {
                            title: "all",
                            url: "/pofo/template/?q=elements"
                        },
                        {
                            title: "button",
                            url: "/pofo/template/?q=inline"
                        }]
                },
                {
                    title: "link button",
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 41 30.75'><g id='Layer_2' ><g id='Layer_1-2' ><path d='M38.87.57a4.48,4.48,0,0,1,1.56,1.56A4.2,4.2,0,0,1,41,4.26V14.51a4.21,4.21,0,0,1-.57,2.14,4.37,4.37,0,0,1-1.56,1.55,4.11,4.11,0,0,1-2.13.58h-6a.79.79,0,0,1-.59-.27.81.81,0,0,1-.27-.59.77.77,0,0,1,.27-.58.84.84,0,0,1,.59-.24h6a2.43,2.43,0,0,0,1.8-.76,2.54,2.54,0,0,0,.74-1.83V4.26a2.45,2.45,0,0,0-.74-1.8,2.45,2.45,0,0,0-1.8-.74H4.26a2.49,2.49,0,0,0-1.78.74,2.4,2.4,0,0,0-.76,1.8V14.51a2.54,2.54,0,0,0,.74,1.83,2.43,2.43,0,0,0,1.8.76H14.51a.89.89,0,0,1,.62.22.79.79,0,0,1,.25.6.85.85,0,0,1-.25.61.83.83,0,0,1-.62.25H4.26a4.11,4.11,0,0,1-2.13-.58A4.37,4.37,0,0,1,.57,16.65,4.21,4.21,0,0,1,0,14.51V4.26A4.2,4.2,0,0,1,.57,2.13,4.48,4.48,0,0,1,2.13.57,4.2,4.2,0,0,1,4.26,0H36.74A4.2,4.2,0,0,1,38.87.57ZM30.46,20.71a.88.88,0,0,1,.27.45.91.91,0,0,1,0,.49.88.88,0,0,1-.31.41.84.84,0,0,1-.51.16H26.28l3,5a1.12,1.12,0,0,1,.13.66,1.21,1.21,0,0,1-.41.53l-3.82,2.22a.71.71,0,0,1-.45.12.49.49,0,0,1-.24,0A.63.63,0,0,1,24,30.3l-2.91-5.78L18.53,27.1a.94.94,0,0,1-.45.21,1.06,1.06,0,0,1-.47,0,.79.79,0,0,1-.37-.31.83.83,0,0,1-.14-.47V11.11a1,1,0,0,1,.12-.47.75.75,0,0,1,.35-.33.76.76,0,0,1,.47-.06,1,1,0,0,1,.45.21Zm-2.87-.21L18.78,13V24.4l2-1.93a.81.81,0,0,1,.61-.25h.12a.93.93,0,0,1,.66.45l3,6,2.3-1.35L24,21.81a.82.82,0,0,1,0-.88.78.78,0,0,1,.73-.43Z'/></g></g></svg>",
                    modelName: "element",
                    viewDefinition: "<a data-block-type='element' class='btn btn-c-theme'  href='#'><span data-block-type='text'>button</span></a>",
                    description: "<a data-block-type='inline' class='btn btn-c-theme' href='#'><span data-block-type='text'>button</span></a>",
                    selector: "[data-block-type=element]",
                    template: [
                        {
                            title: "all",
                            url: "/pofo/template/?q=elements"
                        },
                        {
                            title: "button",
                            url: "/pofo/template/?q=inline"
                        }]
                },
                {
                    title: "text rotator",
                    icon: "<?xml version='1.0' encoding='utf-8'?><!-- Generator: Adobe Illustrator 23.0.3, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version='1.0' id='Calque_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px'     viewBox='0 0 20 20' style='enable-background:new 0 0 20 20;' xml:space='preserve'><g>\t<path d='M19.9,14.1l-3.1,3.8c-0.1,0.2-0.4,0.2-0.5,0l-3.1-3.8c-0.1-0.2-0.1-0.5,0-0.6l0.2-0.2c0.1-0.2,0.4-0.2,0.5,0l2.1,2.6V5.1\t\tH8.1C8,5.1,7.9,5.1,7.9,5L7.6,4.7C7.4,4.4,7.6,3.9,7.9,3.9h8.4c0.4,0,0.8,0.4,0.8,0.9v11l2.1-2.6c0.1-0.2,0.4-0.2,0.5,0l0.2,0.2\t\tC20,13.6,20,13.9,19.9,14.1z M12.2,15c-0.1-0.1-0.2-0.1-0.3-0.1H4V4.1l2.2,2.7C6.3,7,6.5,7,6.6,6.8l0.3-0.4C7,6.3,7,6.1,6.9,6\t\tL3.8,2.1C3.6,2,3.4,2,3.2,2.1L0.1,6C0,6.1,0,6.3,0.1,6.4l0.3,0.4C0.5,7,0.7,7,0.8,6.8L3,4.1v11.3c0,0.4,0.2,0.6,0.5,0.6h8.9\t\tc0.2,0,0.3-0.3,0.2-0.5L12.2,15z'/></g><g>\t<g>\t\t<g>\t\t\t<path d='M12.8,7H7.2C7.1,7,7,7.1,7,7.2v1c0,0.1,0.1,0.2,0.2,0.2c0.1,0,0.3-0.1,0.3-0.2V7.5h1.8v5.1H9c-0.1,0-0.2,0.1-0.2,0.2\t\t\t\tc0,0.1,0.1,0.3,0.2,0.3H11c0.1,0,0.2-0.1,0.2-0.2c0-0.1-0.1-0.3-0.2-0.3h-0.4V8.4c0-0.1-0.1-0.2-0.2-0.2c-0.1,0-0.3,0.1-0.3,0.2\t\t\t\tv4.1H9.8V7.5h2.8v0.8c0,0.1,0.1,0.2,0.2,0.2c0.1,0,0.3-0.1,0.3-0.2v-1C13,7.1,12.9,7,12.8,7z'/>\t\t</g>\t</g></g></svg>",
                    modelName: "element",
                    viewDefinition: "<span data-block-type='element'><span data-block-type='text'>test</span></span>",
                    description: "<span data-block-type='inline'></span>",
                    selector: "[data-block-type=element]"
                },
                {
                    title: "Tooltip",
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16'><path d='M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path d='M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z'/>\n</svg>\n",
                    modelName: "element",
                    viewDefinition: null,
                    description: "<span data-block-type='element' class='badge bg-primary'><span data-block-type='text'>badge</span></span>",
                    selector: "[data-block-type=element]",
                    template: [
                        {
                            title: "all",
                            url: "/pofo/template/?q=elements"
                        },
                        {
                            title: "button",
                            url: "/pofo/template/?q=inline"
                        }]
                }, "|",
                {
                    title: "extra",
                    icon: "<svg focusable='false' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='currentColor'      d='M256 512c-35.5 0-68.1-19.4-85.5-49.6-32.1 8.7-69 1.1-95.5-25.4-25.1-25.1-34.5-61.9-25.4-95.5C19.4 324.2 0 291.5 0 256s19.4-68.2 49.6-85.5c-9.1-33.6.3-70.4 25.4-95.5 25.1-25.1 61.9-34.5 95.5-25.4C187.8 19.4 220.5 0 256 0s68.2 19.4 85.5 49.6c33.6-9.1 70.4.3 95.5 25.4 25.1 25.1 34.5 61.9 25.4 95.5 30.2 17.3 49.6 50 49.6 85.5s-19.4 68.2-49.6 85.5c9.1 33.6-.3 70.4-25.4 95.5-26.1 26.1-62.8 34.3-95.5 25.4-17.4 30.2-50 49.6-85.5 49.6zm-68.3-91.1c3.6 9.6 16.2 59.1 68.3 59.1 51 0 63.7-47 68.3-59.1 32.6 14.8 61.2 22.4 90.1-6.5 36-36 11.8-78.3 6.5-90.1 9.6-3.6 59.1-16.2 59.1-68.3 0-51-47-63.7-59.1-68.3 4.4-9.6 30.3-53.4-6.5-90.1-36-36-78.3-11.8-90.1-6.5C320.7 81.5 308.1 32 256 32c-51 0-63.7 47-68.3 59.1-9.3-4.2-53.3-30.4-90.1 6.5-36 36-11.8 78.3-6.5 90.1C81.5 191.3 32 203.9 32 256c0 51 47 63.7 59.1 68.3-4.4 9.6-30.3 53.4 6.5 90.1 28.8 28.7 57.5 21.3 90.1 6.5z'      />\n</svg>\n",
                    modelName: "element",
                    viewDefinition: null,
                    description: "<span data-block-type='element' class='badge bg-primary'><span data-block-type='text'>badge</span></span>",
                    selector: "[data-block-type=element]",
                    template: [
                        {
                            title: "all",
                            url: "/pofo/template/?q=elements"
                        },
                        {
                            title: "button",
                            url: "/pofo/template/?q=inline"
                        }]
                }]
        },
        {
            title: "media",
            elements: [
                {
                    title: "block image",
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-card-image' viewBox='0 0 16 16'><path d='M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z'/><path d='M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z'/>\n</svg>",
                    modelName: "imageBlock",
                    viewDefinition: "<figure class='image'><img src='http://placehold.it/800?text=%20' alt=''/></figure>",
                    description: "<figure class='image'><img src='http://placehold.it/800?text=%20' alt=''/></figure>",
                    selector: "[data-block-type=inline]",
                    template: [
                        {
                            title: "all",
                            url: "/pofo/template/?q=elements"
                        },
                        {
                            title: "button",
                            url: "/pofo/template/?q=inline"
                        }]
                },
                {
                    title: "inline image",
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16'><path d='M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z'/><path d='M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12V2z'/>\n</svg>\n",
                    modelName: "imageInline",
                    viewDefinition: "<span class='image-inline'><img src='http://placehold.it/100x40?text=%20' alt=''/></span>",
                    description: "<span class='image-inline'><img src='http://placehold.it/100x40?text=%20' alt=''/></span>",
                    selector: "[data-block-type=inline]",
                    template: [
                        {
                            title: "all",
                            url: "/pofo/template/?q=elements"
                        },
                        {
                            title: "button",
                            url: "/pofo/template/?q=inline"
                        }]
                },
                {
                    title: "image light box",
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pip' viewBox='0 0 16 16'><path d='M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5v-9zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z'/><path d='M8 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-3z'/>\n</svg>\n",
                    modelName: "image",
                    viewDefinition: "<figure><img src='https://via.placeholder.com/800x811' alt=''/></figure>",
                    description: "<figure><img src='https://via.placeholder.com/800x811' alt=''/></figure>",
                    selector: "[data-block-type=inline]",
                    template: [
                        {
                            title: "all",
                            url: "/pofo/template/?q=elements"
                        },
                        {
                            title: "button",
                            url: "/pofo/template/?q=inline"
                        }]
                },
                {
                    title: "media",
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 41 30.26'><g><g><path d='M20.5,30.26q-3,0-6-.25l-9.06-.82a5.73,5.73,0,0,1-2.76-.94,5.91,5.91,0,0,1-2.69-5V7A5.91,5.91,0,0,1,2.69,2a5.73,5.73,0,0,1,2.76-.94L14.51.29a61.48,61.48,0,0,1,12,0l9.06.78A5.73,5.73,0,0,1,38.31,2,5.91,5.91,0,0,1,41,7V23.25a5.91,5.91,0,0,1-2.69,5,5.73,5.73,0,0,1-2.76.94L26.49,30Q23.54,30.27,20.5,30.26Zm0-28.54c-1.94,0-3.9.08-5.86.25l-9,.78A4.21,4.21,0,0,0,2.85,4.12,4.11,4.11,0,0,0,1.72,7V23.25a4.11,4.11,0,0,0,1.13,2.89,4.26,4.26,0,0,0,2.77,1.37l9,.78a69.5,69.5,0,0,0,11.72,0l9-.78a4.26,4.26,0,0,0,2.77-1.37,4.11,4.11,0,0,0,1.13-2.89V7a4.11,4.11,0,0,0-1.13-2.89,4.21,4.21,0,0,0-2.77-1.37l-9-.78C24.4,1.8,22.44,1.72,20.5,1.72ZM16.24,23.66a.69.69,0,0,1-.41-.09.77.77,0,0,1-.45-.73V7.46a.78.78,0,0,1,.47-.76.81.81,0,0,1,.84,0l12,7.71a.68.68,0,0,1,.37.68.87.87,0,0,1-.37.76l-12,7.66A.69.69,0,0,1,16.24,23.66ZM17.1,9V21.24l9.51-6.11Z'/></g></g></svg>",
                    modelName: "media",
                    viewDefinition: "<figure class='media'><div data-oembed-url='https://www.youtube.com/watch?v=SWMOSi8GL2g'><div style='position: relative; height: 0; padding-bottom: 56.2493%;'><iframe src='https://www.youtube.com/embed/SWMOSi8GL2g'            style='position: absolute; width: 100%; height: 100%; top: 0; left: 0;'            allow='autoplay; encrypted-media'            allowfullscreen=''></iframe></div></div></figure>",
                    description: "<figure class='media w-500 maxw-p100'><div data-oembed-url='https://www.youtube.com/watch?v=SWMOSi8GL2g'><div style='position: relative; height: 0; padding-bottom: 56.2493%;'><iframe src='https://www.youtube.com/embed/SWMOSi8GL2g'            style='position: absolute; width: 100%; height: 100%; top: 0; left: 0;'            allow='autoplay; encrypted-media'            allowfullscreen=''></iframe></div></div></figure>",
                    selector: "media",
                    template: [
                        {
                            title: "all",
                            url: "/pofo/template/?q=elements"
                        },
                        {
                            title: "button",
                            url: "/pofo/template/?q=inline"
                        }]
                },
                {
                    title: "map",
                    icon: "<svg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 510.285 510.285' height='512' viewBox='0 0 510.285 510.285' width='512'><g><path d='m443.785 314.142h-115.296c45.857-59.002 75.098-119.625 74.026-160.056.001-92.606-74.93-147.944-147.372-147.944s-147.373 55.338-147.373 147.944c-1.106 40.393 28.185 101.096 74.027 160.056h-115.297l-66.5 190h510.285zm-21.285 30 19.744 56.41-163.327-27.605c6.723-7.26 15.568-17.1 25.446-28.805zm-284.731-190.055c0-73.828 59.678-117.944 117.373-117.944 73.47 0 117.373 59.968 117.373 117.944 3.209 52.833-72.592 154.456-117.373 200.346-44.842-45.965-120.579-147.52-117.373-200.346zm95.776 221.2-88.329 28.174-39.905-59.318h100.612c10.988 13.02 20.687 23.72 27.622 31.144zm-152.136-12.929 75.201 111.785h-114.326zm111.357 111.784-30.109-44.756 93.575-29.847 197.329 33.351 14.439 41.252z'/><path d='m255.142 216.651c34.813 0 63.136-28.322 63.136-63.135-3.468-83.758-122.816-83.734-126.272 0 0 34.812 28.323 63.135 63.136 63.135zm0-96.271c18.271 0 33.136 14.865 33.136 33.136-1.82 43.958-64.458 43.946-66.272 0 0-18.272 14.865-33.136 33.136-33.136z'/></g></svg>",
                    modelName: "media",
                    viewDefinition: "<figure class='media'><div data-oembed-url='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2521.81933506317!2d4.415610315650333!3d50.79745667952476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3dadbc1b449a5%3A0xc967c95833861d8!2sRue%20Middelbourg%2010%2C%201170%20Watermael-Boitsfort!5e0!3m2!1sfr!2sbe!4v1628732617009!5m2!1sfr!2sbe'><div style='position: relative; height: 0; padding-bottom: 56.2493%;'><iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2521.81933506317!2d4.415610315650333!3d50.79745667952476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3dadbc1b449a5%3A0xc967c95833861d8!2sRue%20Middelbourg%2010%2C%201170%20Watermael-Boitsfort!5e0!3m2!1sfr!2sbe!4v1628732617009!5m2!1sfr!2sbe'            style='position: absolute; width: 100%; height: 100%; top: 0; left: 0;' allow='autoplay; encrypted-media' allowfullscreen=''></iframe></div></div></figure>",
                    description: "<figure class='media w-500 maxw-p100'><div data-oembed-url='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2521.81933506317!2d4.415610315650333!3d50.79745667952476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3dadbc1b449a5%3A0xc967c95833861d8!2sRue%20Middelbourg%2010%2C%201170%20Watermael-Boitsfort!5e0!3m2!1sfr!2sbe!4v1628732617009!5m2!1sfr!2sbe'><div style='position: relative; height: 0; padding-bottom: 56.2493%;'><iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2521.81933506317!2d4.415610315650333!3d50.79745667952476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3dadbc1b449a5%3A0xc967c95833861d8!2sRue%20Middelbourg%2010%2C%201170%20Watermael-Boitsfort!5e0!3m2!1sfr!2sbe!4v1628732617009!5m2!1sfr!2sbe' style='position: absolute; width: 100%; height: 100%; top: 0; left: 0;' allow='autoplay; encrypted-media' allowfullscreen=''></iframe></div></div></figure>",
                    selector: "media",
                    template: [
                        {
                            title: "all",
                            url: "/pofo/template/?q=elements"
                        },
                        {
                            title: "button",
                            url: "/pofo/template/?q=inline"
                        }]
                }]
        }]
};
