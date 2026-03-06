package pt.formacao.escola.domain.enumeration;

/**
 * The GenreEnum enumeration.
 */
public enum GenreEnum {
    MALE("Male"),
    FEMALE("Female"),
    OTHER("Other");

    private final String value;

    GenreEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
